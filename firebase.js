import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
// import { getStorage } from "firebase/storage";
import { getStorage } from "firebase/storage";
import FirebaseStorageProvider from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyBduHLsol-FT11UPF7nq6OOGC3hzHsrgmE",
  authDomain: "zimotask6.firebaseapp.com",
  projectId: "zimotask6",
  storageBucket: "zimotask6.appspot.com",
  messagingSenderId: "1087233321421",
  appId: "1:1087233321421:web:e678d020126f30d009bc84"
};


const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const database = getFirestore();
// const storage = getStorage();
const storage = getStorage(app);
// const storage = firebase.storage();
// const FirebaseStorageProvider = getStorage();
export {app, database ,storage, FirebaseStorageProvider}