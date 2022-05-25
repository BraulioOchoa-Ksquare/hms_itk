import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
  Sequelize,
} from "sequelize";
import { Doctor } from "./Doctor.model";
import { Patient } from "./Patient.model";

export class Appointment extends Model<
  InferAttributes<Appointment>,
  InferCreationAttributes<Appointment>
> {
  declare id: CreationOptional<number>;
  declare date: string;
  declare hour: string;
  DoctorId?: number;
  PatientId?: number;
  declare status: boolean;
}

export const initAppointmentModel = (sequelize: Sequelize) => {
  Appointment.init(
    {
      id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      date:{
       type: DataTypes.DATEONLY,
       allowNull: false,
      },
      hour:{
        type: DataTypes.STRING,
        allowNull: false,
       },
       status:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
       },
    },
    {
      sequelize, // Instance of sequelize that reflects a connection
    }
    );
    Appointment.belongsTo(Doctor);
    Appointment.belongsTo(Patient);
};