import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";
import User from "./user";
import Card from "./card";

export type TransactionType = "SUS" | "CASH_IN" | "CASH_OUT";

interface TransactionAttributes {
  id: number;
  userId: number;
  cardId: number | null;
  title: string;
  amount: string;
  transactionType: TransactionType;
  date: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

interface TransactionCreationAttributes
  extends Optional<
    TransactionAttributes,
    "id" | "cardId" | "createdAt" | "updatedAt"
  > {}

class Transaction
  extends Model<TransactionAttributes, TransactionCreationAttributes>
  implements TransactionAttributes
{
  public id!: number;
  public userId!: number;
  public cardId!: number | null;
  public title!: string;
  public amount!: string;
  public transactionType!: TransactionType;
  public date!: Date;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Transaction.init(
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
    cardId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "cards",
        key: "id",
      },
      onDelete: "SET NULL",
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      get() {
        const value = this.getDataValue("amount");
        return value ? value.toString() : "0.00";
      },
    },
    transactionType: {
      type: DataTypes.ENUM("SUS", "CASH_IN", "CASH_OUT"),
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "transactions",
  }
);

Transaction.belongsTo(User, { foreignKey: "userId", as: "user" });
User.hasMany(Transaction, { foreignKey: "userId", as: "transactions" });

Transaction.belongsTo(Card, { foreignKey: "cardId", as: "card" });
Card.hasMany(Transaction, { foreignKey: "cardId", as: "transactions" });

export default Transaction;
