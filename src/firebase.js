import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCqRHwjYYdE2F5gZ26robE9byvDvuc-H5Q",
  authDomain: "where-am-i-c4fab.firebaseapp.com",
  projectId: "where-am-i-c4fab",
  storageBucket: "where-am-i-c4fab.appspot.com",
  messagingSenderId: "393665046374",
  appId: "1:393665046374:web:f3948215afd7f332684aa7",
  measurementId: "G-1FKG3MZXDN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);

export default db;
