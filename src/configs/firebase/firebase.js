// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,

  //   apiKey: "AIzaSyCp_ybuMSyC0N57rQWYQpMr8VUsgyVClZQ",
  //   authDomain: "learn-in-summer.firebaseapp.com",
  //   projectId: "learn-in-summer",
  //   storageBucket: "learn-in-summer.appspot.com",
  //   messagingSenderId: "1041081606167",
  //   appId: "1:1041081606167:web:494e221213c330b36b3c52"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
