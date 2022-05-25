import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
  Sequelize,
} from "sequelize";
import { Profile } from "./Profile.model";

export class Patient extends Model<
  InferAttributes<Patient>,
  InferCreationAttributes<Patient>
> {
  declare id: CreationOptional<number>;
  declare gender: string;
  declare birthDate: Date;
  declare age: number;
  ProfileId?: number;
}

export const initPatientModel = (sequelize: Sequelize) => {
  Patient.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      gender:{
       type: DataTypes.STRING,
       allowNull: false,
      },
      birthDate:{
        type: DataTypes.DATEONLY,
        allowNull: false,
       },
       age:{
        type: DataTypes.INTEGER,
        allowNull: false,
       },
    },
    {
      sequelize, // Instance of sequelize that reflects a connection
    }
    );
    Patient.belongsTo(Profile);
};