import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
  Sequelize,
} from "sequelize";
import { Profile } from "./Profile.model";

export class Doctor extends Model<
  InferAttributes<Doctor>,
  InferCreationAttributes<Doctor>
> {
  declare id: CreationOptional<number>;
  declare professionalLicense: string;
  declare speciality: string;
  ProfileId?: number;
}

export const initDoctorModel = (sequelize: Sequelize) => {
  Doctor.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      professionalLicense:{
       type: DataTypes.STRING,
       allowNull: false,
       unique: true,
      },
      speciality:{
        type: DataTypes.STRING,
        allowNull: false,
       },
    },
    {
      sequelize, // Instance of sequelize that reflects a connection
    }
    );
    Doctor.belongsTo(Profile);
};