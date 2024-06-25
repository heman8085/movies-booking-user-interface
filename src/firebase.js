import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAcsiBFMWJ37RtJzem-qrHqnPinf6eGLsI",
  authDomain: "mail-box-b3a52.firebaseapp.com",
  databaseURL: "https://mail-box-b3a52-default-rtdb.firebaseio.com",
  projectId: "mail-box-b3a52",
  storageBucket: "mail-box-b3a52.appspot.com",
  messagingSenderId: "1077407592018",
  appId: "1:1077407592018:web:b3e016150b4dd824bcb98b",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
