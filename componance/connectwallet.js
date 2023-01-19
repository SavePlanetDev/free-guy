"use client";
import { CardanoWallet, MeshBadge, useWallet } from "@meshsdk/react";
import { useState } from "react";
import styles from "../styles/connectwallet.module.css";


export default function Connectwallet() {
          

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
          return(
                    <div className="demo">
                              {connected ? (
                              <div style={{position:"relative",display:"flex",flexFlow:"row",gap:"30px"}}>
                              <div class="nes-field">
                              <label for="name_field" style={{fontSize:"24px"}}>GUYS </label>
                              <input type="number" id="name_field" class="nes-input" style={{fontSize:"24px",width:"200px",top:"20px"}}/>
                              </div>
                              <button
                              style={{fontSize:"24px",width:"100px",height:"50px",top:"50px"}}
                              type="button"
                              class="nes-btn is-success"
                              onClick={() => startMining()}
                              disabled={loading}>
                              {loading ? "Creating transaction..." :"Mint"}
                              </button>
                              
                              </div>
                              ) : (
                              <button type="button" class="nes-btn is-warning" style={{fontSize:"24px", top:"20px"}}> Connect Wallet Plase</button>
                              
                              )}
                              {txHash && (
                              <div>
                              <p>Successful, transaction hash:</p>
                              <code>{txHash}</code>
                              </div>
                              )}
                    </div>
          )
}