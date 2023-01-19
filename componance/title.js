import Connectwallet from './connectwallet'
import style from '../styles/title.module.css'

export default function Title() {
          return( 
          
          <div className={style.contanner}>
             
                    <div className={style.imagecontanner}>
                              <img src="freeguy.gif" width="70%" className={style.image}></img>
                    </div>
                    

                    <div className={style.textcontanner}>
                    <div class="nes-container with-title is-centered">
                    <p class="title">The coolest NFT on Kubverse!</p>
                    <p>2,222 unique pixel art, Profile picture [PFP] <br/>
                       the coolest NFT ever on Kubverse. images, traits,<br/>
                       are all random generated and stored, on bitkub chain.<br/>
                       use KPUNK as your PFP for your Bitkub Next wallet,<br/>
                       Megaland profileand more !, come and be our KPUNK Gang !   <br/></p>
                    </div>
                              <div className={style.buttonmint}>
                                        <Connectwallet/>
                              </div>
                              
                                        
                    </div>
                    
          </div>
          )

}