import { AppWallet, Transaction, KoiosProvider } from "@meshsdk/core";
import { scriptAddressM } from "../../config/wallet";
import axios from "axios";
import { url } from "../../config/mint";
import { updateSignedTx } from "../../backend/update.txSigned";
import { getOgMeta } from "../../backend/get.meta";

export default async function handler(req, res) {
  const tokenId = req.body.tokenId;
  const signedTx = req.body.signedTx;
  // const originalMetadata = req.body.originalMetadata;

  const koios = new KoiosProvider("preview");

  const appWallet = new AppWallet({
    networkId: 0,
    fetcher: koios,
    submitter: koios,
    key: {
      type: "mnemonic",
      words: scriptAddressM,
    },
  });

  const meta = await getOgMeta(tokenId);

  const signedOriginalTx = Transaction.writeMetadata(signedTx, meta.ogMeta);

  const appWalletSignedTx = await appWallet.signTx(signedOriginalTx, true);

  await updateSignedTx(tokenId);

  res.status(200).json({ appWalletSignedTx });
}
