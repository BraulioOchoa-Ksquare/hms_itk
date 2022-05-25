import { Sequelize } from "sequelize";
import { initAppointmentModel } from "./Appointment.models";
import { initDoctorModel } from "./Doctor.model";
import { initPatientModel } from "./Patient.model";
import {initProfileModel} from "./Profile.model"
export let sequelize: Sequelize;

const models = [initProfileModel, initPatientModel, initDoctorModel, initAppointmentModel];

export const startSequelize = (
  db_name: string,
  db_password: string,
  db_hostname: string,
  db_username: string
) => {
  sequelize = new Sequelize(db_name, db_username, db_password, {
    dialect: "postgres",
    host: db_hostname,
    logging: false,
  });

  for (const model of models) {
    model(sequelize);
  }

  sequelize.sync(); //{force: true}
};
