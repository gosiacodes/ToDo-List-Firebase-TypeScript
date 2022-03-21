import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// This web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCWwqJv87aGIrLWgNo39SlKHTsjPAXiNw4",
  authDomain: "my-things-to-do-app.firebaseapp.com",
  databaseURL: "https://my-things-to-do-app-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "my-things-to-do-app",
  storageBucket: "my-things-to-do-app.appspot.com",
  messagingSenderId: "1049471641136",
  appId: "1:1049471641136:web:b560312b45b1a349ed6ff5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Database
const db = getDatabase(app); 

export { db };