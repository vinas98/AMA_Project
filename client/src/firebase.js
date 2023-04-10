
import { getAuth } from "firebase/auth";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfBr9oqn9Y5bNSavOVTQtyEiiS9zq6hr4",
  authDomain: "slot1-e5b91.firebaseapp.com",
  databaseURL: "https://slot1-e5b91.firebaseio.com",
  projectId: "slot1-e5b91",
  storageBucket: "slot1-e5b91.appspot.com",
  messagingSenderId: "392079534262",
  appId: "1:392079534262:web:a6f8f5d5753cc04de89e17"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();