import { Model, DataTypes } from "sequelize";

class User extends Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            isEmail: true,
          },
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        role: {
          type: DataTypes.ENUM("user", "admin"),
          allowNull: false,
          defaultValue: "user",
        },
      },
      {
        sequelize,
        modelName: "User",
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Item, { foreignKey: "user_id" });
    this.hasMany(models.Bid, { foreignKey: "user_id" });
    this.hasMany(models.Notification, { foreignKey: "user_id" });
  }
}

export default User;
