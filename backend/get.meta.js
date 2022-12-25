import { url } from "../config/mint";
import axios from "axios";

export const getOgMeta = async (tokenId) => {
  const meta = (await axios.get(`${url}/og/${tokenId}`)).data.data;
  return meta;
};
