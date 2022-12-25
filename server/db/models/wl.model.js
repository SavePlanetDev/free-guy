const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../database");

class Whitelist extends Model {}

Whitelist.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    wallet: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    wl: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    minted: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  { sequelize }
);

module.exports = Whitelist;
