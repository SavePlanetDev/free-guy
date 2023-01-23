import style from "../styles/title.module.css";
import MintingForm from "../components/minter";
import { useWallet } from "@meshsdk/react";

export default function Title() {
  const { connected } = useWallet();
  return (
    <div className={style.contanner}>
      <div className={style.imagecontanner}>
        <img src="freeguy.gif" width="70%" className={style.image}></img>
      </div>

      <div className={style.textcontanner}>
        <div className="nes-container with-title is-centered">
          <p className="title">The coolest NFT on Kubverse!</p>
          <p>
            1,111 unique pixel art, Profile picture <br />
            the coolest NFT ever on Kubverse. images, traits,
            <br />
            are all random generated and stored, on bitkub chain.
            <br />
            use KPUNK as your PFP for your Bitkub Next wallet,
            <br />
            Megaland profileand more !, come and be our KPUNK Gang ! <br />
          </p>
        </div>
        {connected ? <MintingForm /> : null}
      </div>
    </div>
  );
}
