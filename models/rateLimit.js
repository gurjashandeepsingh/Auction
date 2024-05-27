import { Model, DataTypes } from "sequelize";

class RequestLimit extends Model {
  static init(sequelize) {
    return super.init(
      {
        ip_address: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        request_count: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        last_request_at: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        sequelize,
        modelName: "RequestLimit",
        tableName: "RequestLimits",
        timestamps: false,
      }
    );
  }
}

export default RequestLimit;
