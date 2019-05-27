import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyBJubM-EcKkylblfW1KrqBXD3CPY5UxS5M",
    authDomain: "whatarewegoingtoeattoday.firebaseapp.com",
    databaseURL: "https://whatarewegoingtoeattoday.firebaseio.com",
    projectId: "whatarewegoingtoeattoday",
    storageBucket: "whatarewegoingtoeattoday.appspot.com",
    messagingSenderId: "882755049330",
    appId: "1:882755049330:web:b646ad44d98f1084"
  };

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();

export const db = firebase.firestore();