// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';
// import { initializeApp } from 'firebase-admin/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const { initializeApp } = require('firebase-admin/app');
const firebaseConfig = {
  apiKey: "AIzaSyDP4iPchOF0R-x0p1UoMkFwOM_zKg3S_Yc",
  authDomain: "reels-ae1eb.firebaseapp.com",
  projectId: "reels-ae1eb",
  storageBucket: "reels-ae1eb.appspot.com",
  messagingSenderId: "1014824321411",
  appId: "1:1014824321411:web:dbc072c9fa4bd73a04b6b6"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

const firestore = firebase.firestore();
export const database = {
  users : firestore.collection('users'),
  posts : firestore.collection('posts'),
  getTimestamp : firebase.firestore.FieldValue.serverTimestamp
}

export const storage = firebase.storage()