import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";
import User from "./user";

interface CardAttributes {
  id: number;
  userId: number;
  issuer: string;
  name: string;
  expDate: string;
  lastDigits: number;
  balance: string;
  currency: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface CardCreationAttributes
  extends Optional<CardAttributes, "id" | "createdAt" | "updatedAt"> {}

class Card
  extends Model<CardAttributes, CardCreationAttributes>
  implements CardAttributes
{
  public id!: number;
  public userId!: number;
  public issuer!: string;
  public name!: string;
  public expDate!: string;
  public lastDigits!: number;
  public balance!: string;
  public currency!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Card.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    issuer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expDate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastDigits: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    balance: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      get() {
        const value = this.getDataValue("balance");
        return value ? value.toString() : "0.00";
      },
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "USD",
    },
  },
  {
    sequelize,
    tableName: "cards",
  }
);

Card.belongsTo(User, { foreignKey: "userId", as: "user" });
User.hasMany(Card, { foreignKey: "userId", as: "cards" });

export default Card;
