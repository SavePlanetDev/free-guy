const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../database");

class NFT extends Model {}

NFT.init(
  {
    tokenId: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(255),
      unique: true,
      allowNull: false,
    },
    desc: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    power: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ipfs: {
      type: DataTypes.STRING(255),
      unique: true,
      allowNull: false,
    },
    minted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    minter: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "na",
    },
  },
  { sequelize }
);

module.exports = NFT;
