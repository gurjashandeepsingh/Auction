import { Sequelize } from "sequelize";
import User from "./user.js";
import Item from "./item.js";
import Bid from "./bid.js";
import Notification from "./notification.js";
import sequelize from "../sequelize.config.js";
import RequestLimit from "./rateLimit.js";

const models = {
  User: User.init(sequelize, Sequelize),
  Item: Item.init(sequelize, Sequelize),
  Bid: Bid.init(sequelize, Sequelize),
  RequestLimit: RequestLimit.init(sequelize, Sequelize),
  Notification: Notification.init(sequelize, Sequelize),
};

Object.values(models)
  .filter((model) => typeof model.associate === "function")
  .forEach((model) => model.associate(models));

export default models;
