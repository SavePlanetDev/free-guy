import { url } from "../config/mint";
import axios from "axios";

export const updateMintedNft = async (tokenId) => {
  await axios.put(`${url}/mkMinted/${tokenId}/${recipientAddress}`);
};
