const TxMeta = require("../models/txMeta.model");

const addNewOgMeta = async (tokenId, minter, ogMeta, maskedMeta) => {
  const [created, result] = await TxMeta.findOrCreate({
    where: { tokenId },
    defaults: {
      tokenId,
      minter,
      ogMeta,
      maskedMeta,
    },
  });

  return created ? result : input;
};

const getOgMetaByTokenId = async (tokenId) => {
  const found = await TxMeta.findOne({ where: { tokenId } });
  return !found ? undefined : found.dataValues;
};

const updateSignedTx = async (tokenId) => {
  const result = await TxMeta.update({ signed: true }, { where: { tokenId } });
  console.log(result);
  return result[0] <= 0 ? false : true;
};

const updateSubmitted = async (tokenId) => {
  const result = await TxMeta.update(
    { submited: true },
    { where: { tokenId } }
  );

  return result[0] <= 0 ? false : true;
};

module.exports = {
  addNewOgMeta,
  updateSignedTx,
  updateSubmitted,
  getOgMetaByTokenId,
};
