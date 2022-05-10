# hms_itk
Final project of the course


## User Model
### This user model is used to create the users of the platform and this is the first part
```ts

interface User{
  id: number; //Primary Key and auto_increment
  username: string; //Varchar(100);
  password: string; //Varchar(30);
  email: string; //Varchar(100);
  role: string; //Varchar(100); this would be Admin-Doctor-Patient
}
```

## Profile Model
### This model will contain all the information of the Doctor and the patient only
```ts
interface Profile{
  user_id: number;//Foreing Key from the interface User id
  name: string; // Varchar(100);
  lastName: string; // Varchar(100);
  address: string; //Varchar(100);
  phone_number: string; //Varchar(15);
}
```

## Patient Model
### This model will contain all the patient information that it's necessary to have and it will have an Id that would help the Dr and Admin to filter the patient
```ts
interface Patient User {
  profile_user_id: number;//Foreing Key from the interfaces profile and user
  id: number; //Primary Key and auto_increment
  gender: string; //varchar(20)
  date: string; //date
  age: number;
}
```

## Medical Information of the Patient Model
### This model will contain if the patient is alergic to a medicine
```ts
interface Patient User {
  patient_id: number//Foreing Key from the interface patient
  alergicMed: string; //Varchar(100);
}
```
## Doctor Model
### This model will contain all the information of the Doctor and an Id that would help the Admin to filter the Dr info
```ts
interface Doctor{
  profile_user_id: number;//Foreing Key from the interfaces profile and user
  id: number; //Primary Key and auto_increment
  speciality: string; //varchar(100)
}

```

## Appointment Model
### This model is created because we need to have a register of all the appointment and we need to know what doctor gave it and what patient took it
```ts
interface Appointment{
  id: number; // Primary Key and auto_increment
  date: string; //date
  doctor_id: number; //Foreing Key from the Interface Doctor this would help us to have de id of the Dr in the Appointment
  patient_id: number; //Foreing Key from the Interface Patient this would help us to have de id of the patient in the Appointment
}
```
## Admin Model
### This model created becaused the admin needs to log in to the platform, so he needs to have an account is like a super user
```ts
interface Admin{
  user_id:number;//foreing Key from the interface User
  id: number; //Primary Key and auto_increment
}

```