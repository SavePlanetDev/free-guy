import { url } from "../config/mint";

import axios from "axios";

export const addNewMeta = async (tokenId, minter, ogMeta, maskedMeta) => {
  await axios.post(`${url}/newMeta`, {
    tokenId,
    minter,
    ogMeta,
    maskedMeta,
  });
};
