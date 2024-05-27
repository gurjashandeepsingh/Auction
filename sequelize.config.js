import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config({
  silent: true,
});

const db = new Sequelize(
  "Auction_DB",
  process.env.DB_USERNAME || "",
  process.env.DB_PASSWORD || "",
  {
    host: process.env.DB_HOST || "",
    dialect: "mysql",
    dialectOptions: {
      charset: "utf8mb4",
    },
    // logging: false,
  }
);

export default db;
