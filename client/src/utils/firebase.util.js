// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, connectAuthEmulator } from "firebase/auth";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
//TODO: move to .env file
const firebaseConfig = {
  apiKey: "AIzaSyBFLX-ebhliAnqb9vG-pGqWBuL_j3tte34",
  authDomain: "teamfinder-6bc3d.firebaseapp.com",
  projectId: "teamfinder-6bc3d",
  storageBucket: "teamfinder-6bc3d.appspot.com",
  messagingSenderId: "262352777515",
  appId: "1:262352777515:web:dd11130219f6cad4a8156e",
  measurementId: "G-KYWYL69XCK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);

if (process.env.NODE_ENV === "development") {
  connectAuthEmulator(auth, "http://localhost:9099", {
    disableWarnings: true,
  });
}
