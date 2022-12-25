import { url } from "../config/mint";
import axios from "axios";

export const getUnmintedNfts = async () => {
  let nfts = (await axios.get(`${url}/unminted`)).data.data;
  return nfts;
};
