import { url } from "../config/mint";
import axios from "axios";

export const updateSignedTx = async (tokenId) => {
  await axios.put(`${url}/signed/${tokenId}`);
};
