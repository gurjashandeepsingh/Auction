import { Model, DataTypes } from "sequelize";

class Bid extends Model {
  static init(sequelize) {
    return super.init(
      {
        bid_amount: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        item_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "Bid",
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "user_id" });
    this.belongsTo(models.Item, { foreignKey: "item_id" });
  }
}

export default Bid;
