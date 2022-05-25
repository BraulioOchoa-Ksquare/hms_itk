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
      isActive: user.disabled,
    };
  };
  
  export const disableUser = async (uid: string, disabled: boolean) => {
    const user = await admin.auth().updateUser(uid, { disabled });
    return mapToUser(user);
  };