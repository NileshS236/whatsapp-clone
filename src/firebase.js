import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAD_Vr8rKywbn3is89tgL68sEG3YhmInwQ",
  authDomain: "whatsapp-clone-4b3ff.firebaseapp.com",
  databaseURL: "https://whatsapp-clone-4b3ff.firebaseio.com",
  projectId: "whatsapp-clone-4b3ff",
  storageBucket: "whatsapp-clone-4b3ff.appspot.com",
  messagingSenderId: "149848342425",
  appId: "1:149848342425:web:28cf04637ff865185add08",
  measurementId: "G-NC47LDKZSX",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
