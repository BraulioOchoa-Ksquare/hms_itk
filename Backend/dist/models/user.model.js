Object.defineProperty(exports, '__esModule', { value: true });
exports.initUserModel = exports.User = void 0;
const sequelize_1 = require('sequelize');

class User extends sequelize_1.Model {
}
exports.User = User;
const initUserModel = (sequelize) => {
  User.init({
    id: {
      type: sequelize_1.DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: sequelize_1.DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: sequelize_1.DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: sequelize_1.DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    role: {
      type: sequelize_1.DataTypes.STRING,
      allowNull: false,
    },
    isActive: {
      type: sequelize_1.DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
  }, {
    sequelize, // Instance of sequelize that reflects a connection
  });
};
exports.initUserModel = initUserModel;
