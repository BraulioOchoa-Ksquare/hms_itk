import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
  Sequelize,
} from "sequelize";

export class Profile extends Model<
  InferAttributes<Profile>,
  InferCreationAttributes<Profile>
> {
  declare uid: string;
  declare id: CreationOptional<number>;
  declare firstName: string;
  declare lastName: string;
  declare address: string;
  declare phoneNumber: string;
}

export const initProfileModel = (sequelize: Sequelize) => {
  Profile.init(
    {
      uid:{
        type: DataTypes.STRING,
        allowNull: false,
       },

      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      firstName:{
       type: DataTypes.STRING,
       allowNull: false,
      },

      lastName:{
        type: DataTypes.STRING,
        allowNull: false,
       },

       address:{
        type: DataTypes.STRING,
        allowNull: false,
       },

       phoneNumber: {
        type: DataTypes.STRING,
        defaultValue: true,
        allowNull: false,
      },
    },
    {
      sequelize, // Instance of sequelize that reflects a connection
    }
  );
};