import firebase from 'firebase/app';
import 'firebase/auth';

var firebaseConfig = {
  apiKey: "AIzaSyDknsgqwYJvXvFia0xI_03unRSc8C_JY-M",
  authDomain: "makeshotsgreatagain.firebaseapp.com",
  databaseURL: "https://makeshotsgreatagain.firebaseio.com",
  projectId: "makeshotsgreatagain",
  storageBucket: "makeshotsgreatagain.appspot.com",
  messagingSenderId: "606040074445",
  appId: "1:606040074445:web:914e8b34f2b48c609de184",
  measurementId: "G-1C19HF38H0"
};

firebase.initializeApp(firebaseConfig);

export let auth = firebase.auth();
export let provider = new firebase.auth.GoogleAuthProvider();