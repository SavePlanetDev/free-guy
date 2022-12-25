import Head from "next/head";
import Image from "next/image";
import { CardanoWallet, MeshBadge, useWallet } from "@meshsdk/react";
import { createTransaction, signTransaction } from "../backend";
import { useState } from "react";
import logo from "../styles/nft33.jpg";
import { updateMintedNft } from "../backend/update.nft.minted";
import { updateMintedTx } from "../backend/update.txMinted";

export default function Home() {
  const { wallet, connected } = useWallet();
  const [txHash, setTxHash] = useState(null);
  const [loading, setLoading] = useState(false);

  async function startMining() {
    setLoading(true);
    try {
      const recipientAddress = await wallet.getChangeAddress();
      const utxos = await wallet.getUtxos();

      const { tokenId, maskedTx } = await createTransaction(
        recipientAddress,
        utxos
      );

      const signedTx = await wallet.signTx(maskedTx, true);

      const { appWalletSignedTx } = await signTransaction(tokenId, signedTx);

      const txHash = await wallet.submitTx(appWalletSignedTx);

      setTxHash(txHash);
      //mark as minted
      if (txHash) {
        await updateMintedNft(tokenId);
        await updateMintedTx(tokenId);
      }

      alert(txHash);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }

  return (
    <div className="container">
      <Head>
        <title>Mesh App on Cardano</title>
        <meta name="description" content="A Cardano dApp powered my Mesh" />
        <link rel="icon" href="https://meshjs.dev/favicon/favicon-32x32.png" />
        <link
          href="https://meshjs.dev/css/template.css"
          rel="stylesheet"
          key="mesh-demo"
        />
      </Head>

      <main style={{ backgroundColor: "#316B83" }} className="main">
        <h1 className="title">
          <a style={{ color: "#FF7878" }}>Pixat</a> NFT
        </h1>
        <Image src={logo} width={300} height={300} alt="logo" />

        <div className="demo">
          {connected ? (
            <button
              type="button"
              onClick={() => startMining()}
              disabled={loading}
            >
              {loading ? "Creating transaction..." : "Mint Pixat (2 ADA/NFT)"}
            </button>
          ) : (
            <CardanoWallet />
          )}
          {txHash && (
            <div>
              <p>Successful, transaction hash:</p>
              <code>{txHash}</code>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
