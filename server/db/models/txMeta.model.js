const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../database");

class TxMeta extends Model {}

TxMeta.init(
  {
    tokenId: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    minter: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    ogMeta: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    maskedMeta: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "na",
    },
    signed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    submited: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  { sequelize }
);

module.exports = TxMeta;
