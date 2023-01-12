import { getFirestore, collection } from "firebase/firestore";
import { initializeApp } from "firebase/app";

export const firebaseConfig = {
  apiKey: "AIzaSyAL45c-lwvOSspWHtOuCq19rKm1g1vN958",
  authDomain: "form-app-greydive.firebaseapp.com",
  projectId: "form-app-greydive",
  storageBucket: "form-app-greydive.appspot.com",
  messagingSenderId: "508510305068",
  appId: "1:508510305068:web:52c54e3b171f81d0db0a89",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const formsRef = collection(db, "forms");
