const NFT = require("../models/nft.model");

const addNewNFT = async (nftData = []) => {
  if (nftData.length <= 0) return;
  const result = await NFT.bulkCreate(nftData).catch((e) => console.log(e));
  console.log(result);
};
const getAllNFTs = async () => {
  const results = await NFT.findAll();
  return results.length <= 0 ? [] : results.map((result) => result.dataValues);
};

const getAllUnMintedNFTs = async () => {
  const results = await NFT.findAll({ where: { minted: false } });
  return results.length <= 0 ? [] : results.map((result) => result.dataValues);
};

const getNFTById = async (tokenId) => {
  const result = await NFT.findOne({ where: { tokenId } });
  return !result ? undefined : result.dataValues;
};

const markAsMinted = async (tokenId, minter) => {
  const result = await NFT.update(
    { minter, minted: true },
    { where: { tokenId } }
  );

  return result <= 0 ? false : true;
};

module.exports = {
  addNewNFT,
  getAllNFTs,
  getAllUnMintedNFTs,
  getNFTById,
  markAsMinted,
};
