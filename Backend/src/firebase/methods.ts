import * as admin from "firebase-admin";
import { Role } from "../roles";

export const createUser = async (displayName: string, email: string, password: string, role: Role) => {
  const { uid } = await admin.auth().createUser({
    displayName: displayName,
    email: email,
    password: password
  });
  await admin.auth().setCustomUserClaims(
    uid, {
      role
    }
  );
    return uid;
  }

  const mapToUser = (user: admin.auth.UserRecord) => {
    const customClaims = (user.customClaims || { role: "" }) as { role?: string };
    const role = customClaims.role ? customClaims.role : "";
    
    return {
      uid: user.uid,
      email: user.email,
      role,
      isInactive: user.disabled,
    };
  };

  export const userUid = async (uid:string) => {
    const user = await admin.auth().getUser(uid);
    return mapToUser(user);
  };

  export const deleteUser = async (uid:string) => {
    await admin.auth().deleteUser(uid);
  };

  // export const usersList = async () => {
  //   console.log("test")
  //   const listAllMyUsers = await.auth().listUsers(100);
  //   const user = await admin.auth().listUsers(100);
  //   return mapToUser(user);
  // };

  export const getAllUsers = async () => {
    const listAllMyUsers = await admin.auth().listUsers(100);
    const users = listAllMyUsers.users.map(mapToUser);
    return users;
  };

  export const disableUser = async (uid: string, disabled: boolean) => {
    const user = await admin.auth().updateUser(uid, { disabled });
    return mapToUser(user);
  };
