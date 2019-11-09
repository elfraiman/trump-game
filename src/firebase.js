import firebase from 'firebase/app';
import 'firebase/auth';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDknsgqwYJvXvFia0xI_03unRSc8C_JY-M",
  authDomain: "makeshotsgreatagain.firebaseapp.com",
  databaseURL: "https://makeshotsgreatagain.firebaseio.com",
  projectId: "makeshotsgreatagain",
  storageBucket: "makeshotsgreatagain.appspot.com",
  messagingSenderId: "606040074445",
  appId: "1:606040074445:web:ed9fd39a0e5200919de184",
  measurementId: "G-KW35KNJE85"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

export let auth = firebase.auth();
export let provider = new firebase.auth.GoogleAuthProvider();