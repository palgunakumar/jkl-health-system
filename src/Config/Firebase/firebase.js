import { initializeApp } from 'firebase/app';
import { config } from './config'
import { collection, collectionGroup, doc, getFirestore, serverTimestamp, writeBatch} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getMessaging } from "firebase/messaging";
import { getDatabase, ref as dbRef } from "firebase/database";
import { getStorage, ref } from 'firebase/storage';
import { getAnalytics } from "firebase/analytics";
import {getFunctions} from 'firebase/functions'
export const app = initializeApp(config);
export const firestoreDb = getFirestore(app);
export const auth = getAuth(app)
export const db = getDatabase(app);
export const messaging = getMessaging(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);
export const batch = writeBatch(firestoreDb);
export const functions = getFunctions(app);
export const usersRef = () => collection(firestoreDb, "/users");
export const userRef = (id) => doc(firestoreDb, `/users/${id}`);
export const users = () => collection(firestoreDb, "users");
export const emailDocRef = (id) => doc(firestoreDb,`/mail/${id}`);
export const emailColRef = () => collection(firestoreDb,`mail`);
