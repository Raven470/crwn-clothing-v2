//*** Import the functions you need from the SDKs you need */
import { initializeApp } from "firebase/app";

//*** Import about Authentication */
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
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

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

// export const auth = getAuth();
export const auth = getAuth();
// for sing-in with googlePopup
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

// Get db
export const db = getFirestore();

//*** sign-in and get auth then store user data */
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation
) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  // if user data NOT exists
  // create / set the document with the data from userAuth in my collection
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (err) {
      console.log("error creating the user", err.message);
    }
  }

  // if user data exists
  return userDocRef;
};

//*** get auth from sign-up with email and password */
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

///* sign in */
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};
