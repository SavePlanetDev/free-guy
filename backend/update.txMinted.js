import { url } from "../config/mint";
import axios from "axios";

export const updateMintedTx = async (tokenId) => {
  await axios.put(`${url}/minted/${tokenId}`);
};
