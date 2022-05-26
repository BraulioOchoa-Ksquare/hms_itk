# hms_itk

Final project of the course

## Install dependencies
npm install
npm install -D

## How to run
npm run dev

## Enviroment Variables
PORT = 5000

DB_NAME = hms_system
DB_USERNAME = postgres
DB_PASSWORD = admin
DB_HOST = localhost

GOOGLE_APPLICATION_CREDENTIALS=C:\Users\Topaz\OneDrive\Documentos\GitHub\credentials\itk-5g-users-b93f2-firebase-adminsdk-nsdap-0d8055cfb9.json

SUPER_USER = admin@test.com

## Postman Collection
https://www.postman.com/collections/c3ee84ac66308a831484

## User Model
### This user model is used to create the users of the platform and this is the first part
```ts

interface User{
  id: number; //Primary Key and auto_increment
  username: string; //Varchar(100);
  password: string; //Varchar(30);
  email: string; //Varchar(100);
  role: string; //Varchar(100); this would be Admin-Doctor-Patient
  isActive: boolean; //This is would be used for disable Users in case that the user isn't going to the Hospital  or work in the hospital anymore, but in case that the user returns it will be active again and the information will be there.
}
```

## Profile Model
### This model will contain all the information of the Doctor and the patient only
```ts
interface Profile{
  userId: number;//Foreing Key from the interface User id
  id: number;//PK
  name: string; // Varchar(100);
  lastName: string; // Varchar(100);
  address: string; //Varchar(100);
  phoneNumber: string; //Varchar(15);
}
```
## Patient Model
### This model will contain all the patient information that it's necessary to have and it will have an Id that would help the Dr and Admin to filter the patient
```ts
interface Patient{
  profileId: number;//Foreing Key from the interfaces profile and user
  id: number; //Primary Key and auto_increment
  gender: string; //varchar(20)
  date: string; //date
  age: number;
}
```
## Medical Information of the Patient Model
### This model will contain if the patient is alergic to a medicine
```ts
interface Medical Information Patient {
  patientId: number//Foreing Key from the interface patient
  alergicMed: string; //Varchar(100);
  bloodType: string; //Varchar(100);
}
```
## Doctor Model
### This model will contain all the information of the Doctor and an Id that would help the Admin to filter the Dr info
```ts
interface Doctor{
  profileId: number;//Foreing Key from the interfaces profile and user
  id: number; //Primary Key and auto_increment
  professionalLicense: string; //Because you don´t want to hire a doctor without all the studies that they need to have
  speciality: string; //varchar(100);
}

```
## Appointment Model
### This model is created because we need to have a register of all the appointment and we need to know what doctor gave it and what patient took it
```ts
interface Appointment{
  id: number; // Primary Key and auto_increment
  date: string; //date
  hour: string;
  doctorId: number; //Foreing Key from the Interface Doctor this would help us to have de id of the Dr in the Appointment
  patientId: number; //Foreing Key from the Interface Patient this would help us to have de id of the patient in the Appointment
  status: boolean; //In case that the appointment was cancel it will be false
}

