// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// import {initializeApp} from "firebase/app"
// import { getFirestore } from 'firebase/firestore/lite';
// import { getAuth} from 'firebase/auth';
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCwGOQDgnV4W5DgCDQKFLqXc8nEdSYqiZM",
  authDomain: "clone-c356d.firebaseapp.com",
  projectId: "clone-c356d",
  storageBucket: "clone-c356d.appspot.com",
  messagingSenderId: "597270075372",
  appId: "1:597270075372:web:d27823a6eef5cbd7f6d2c9",
  measurementId: "G-H10K44HV3M",
};

//step 1. Initailize the app

// const firebaseApp = initializeApp(firebaseConfig);

// const db = getFirestore(firebaseApp);
// const auth = getAuth(firebaseApp);

// export {db,auth};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
