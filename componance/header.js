import { CardanoWallet, MeshBadge } from "@meshsdk/react";
import styles from "../styles/header.module.css";

export default function Header() {


          return(
                    <div className={styles.contanner}>
                              
                              <img src="logo.png" width="200vw " className={styles.logo}></img>
                              
                              <div style={{position:"relative",top:"30px"}}>
                              <img src="bannerfreeguy.png"   width="102%" min-width="100%" min-height="100%" max-height="100%" max-width="100%" className={styles.imagebanner}></img>         
                              </div>
                              <div className={styles.connectwallet}>
                                        <CardanoWallet></CardanoWallet>
                              </div>
                    </div>
          )

}