// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyBJuTtAcCTghmQAha_fKYoeOhOJtyHAhWo",
  authDomain: "aqd-map-17674.firebaseapp.com",
  databaseURL: "https://aqd-map-17674-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "aqd-map-17674",
  storageBucket: "aqd-map-17674.appspot.com",
  messagingSenderId: "137149531944",
  appId: "1:137149531944:web:44d6334786ec6612a8721d",
  measurementId: "G-R048QQ4J7B"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
//? on initialise Firebase dans app, avec les configs de "firebaseConfig"
export const db = getFirestore(app)
