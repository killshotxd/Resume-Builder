import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {
  doc,
  getFirestore,
  setDoc,
  getDoc,
  addDoc,
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
} from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAKjSMEd6sybraN7jUaCnGm_JUisKOMlFo",
  authDomain: "resumebuilder-69150.firebaseapp.com",
  projectId: "resumebuilder-69150",
  storageBucket: "resumebuilder-69150.appspot.com",
  messagingSenderId: "91067533357",
  appId: "1:91067533357:web:ebbbfd1ebe35af633050a4",
  measurementId: "G-Z232CT22YD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

const updateUserDb = async (user, uid) => {
  if (typeof user !== "object") return;
  const docRef = doc(db, "users", uid);
  await setDoc(docRef, { ...user, uid });
};

export { app, auth, updateUserDb };
