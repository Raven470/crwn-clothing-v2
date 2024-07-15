//*** Import the functions you need from the SDKs you need */
import { initializeApp } from "firebase/app";

//*** Import about Authentication */
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

//*** Import about FirestoreDB */
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKNYLp3aoS8ooyby_W8rRO-a4SEiOvB4A",
  authDomain: "crwn-clothing-db-22f86.firebaseapp.com",
  projectId: "crwn-clothing-db-22f86",
  storageBucket: "crwn-clothing-db-22f86.appspot.com",
  messagingSenderId: "178769996392",
  appId: "1:178769996392:web:b20421df988daf44c629dd",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

// for sing-in with googlePopup
export const auth = getAuth();
export const signInWithCooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  // if user data NOT exists
  // create / set the document with the data from userAuth in my collection
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, { displayName, email, createdAt });
    } catch (err) {
      console.log("error creating the user", err.message);
    }
  }

  // if user data exists
  return userDocRef;
};
