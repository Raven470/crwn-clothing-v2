//*** Import the functions you need from the SDKs you need */
import { initializeApp } from "firebase/app";

//*** Import about Authentication */
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

//*** Import about FirestoreDB */
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";

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

//
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log("done");
};

//
export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
};

//*** sign-in and get auth then store user data */
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  // if user data NOT exists
  // create / set the document with the data from userAuth in my collection
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      // return await setDoc(userDocRef, {
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

  console.log("should not be here");
  // if user data exists
  return userDocRef;
};

//*** get auth from sign-up with email and password */
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

///* sign in with email & password*/
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

///* sign out */
export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  // onAuthStateChanged(auth, callback, errorCallback, completedCallback);
  onAuthStateChanged(auth, callback);

/* 
  {
  next: (nextVal) => {// do something with val}
  error: (error) => {// do something with error}
  compele: () => {do comething when finished}
  }

*/
