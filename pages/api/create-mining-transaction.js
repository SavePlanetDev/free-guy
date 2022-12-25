import {
  AppWallet,
  ForgeScript,
  Transaction,
  KoiosProvider,
  largestFirst,
} from "@meshsdk/core";
import { scriptAddressM } from "../../config/wallet";
import { bankWalletAddress, costLovelace } from "../../config/mint";

import { addNewMeta } from "../../backend/new.meta";
import { getUnmintedNfts } from "../../backend/get.nft.unminted";

export default async function handler(req, res) {
  const recipientAddress = req.body.recipientAddress;
  const utxos = req.body.utxos;

  const blockchainProvider = new KoiosProvider("preprod");

  const appWallet = new AppWallet({
    networkId: 1,
    fetcher: blockchainProvider,
    submitter: blockchainProvider,
    key: {
      type: "mnemonic",
      words: scriptAddressM,
    },
  });

  const appWalletAddress = appWallet.getPaymentAddress();
  const forgingScript = ForgeScript.withOneSignature(appWalletAddress);

  /**
   * TODO: Here you want to select one of your NFT that has not been minted
   */
  // let nfts = (await axios.get(`${url}/unminted`)).data.data;
  let nfts = await getUnmintedNfts();
  if (nfts.length <= 0) {
    res.status(404).json({ result: "mintedOut", data: [] });
  }
  // const assetIdPrefix = "MeshToken";
  // In this starter template, we simply randomly pick one from.
  let selectedAssetId = Math.floor(Math.random() * 31923) % 37;
  let selectedNft = nfts[selectedAssetId];

  const metadata = {
    name: selectedNft.name,
    image: selectedNft.ipfs,
    desc: selectedNft.desc,
    power: selectedNft.power,
  };

  const asset = {
    assetName: selectedNft.name,
    assetQuantity: "1",
    metadata: metadata,
    label: "721",
    recipient: {
      address: recipientAddress,
    },
  };

  const selectedUtxos = largestFirst(costLovelace, utxos, true);

  const tx = new Transaction({ initiator: appWallet });
  tx.setTxInputs(selectedUtxos);
  tx.mintAsset(forgingScript, asset);
  tx.sendLovelace(bankWalletAddress, costLovelace);
  tx.setChangeAddress(recipientAddress);

  const unsignedTx = await tx.build();

  const originalMetadata = Transaction.readMetadata(unsignedTx);

  const maskedTx = Transaction.maskMetadata(unsignedTx);

  await addNewMeta(
    parseInt(selectedNft.tokenId),
    recipientAddress,
    originalMetadata,
    maskedTx
  );

  // In this starter template, we send `originalMetadata` to the frontend.
  // Not recommended, its better to save the `originalMetadata` in a database.
  res.status(200).json({ tokenId: parseInt(selectedNft.tokenId), maskedTx });
}
