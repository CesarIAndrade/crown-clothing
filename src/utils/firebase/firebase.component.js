import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
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

const firebaseConfig = {
  apiKey: "AIzaSyD0WGI-KWQKTMYU2DTvFPNkSFNnEqlBsb0",
  authDomain: "adept-cascade-288518.firebaseapp.com",
  projectId: "adept-cascade-288518",
  storageBucket: "adept-cascade-288518.appspot.com",
  messagingSenderId: "192536421409",
  appId: "1:192536421409:web:fb5acf99a0b1642c522f60",
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const addDocsToCollection = async (collectionName, docsToAdd) => {
  let collectionRef = collection(db, collectionName);
  let batch = writeBatch(db);

  docsToAdd.forEach((_doc) => {
    let docRef = doc(collectionRef, _doc.title.toLowerCase());
    batch.set(docRef, _doc);
  });

  await batch.commit();
  console.log("done");
};

export const getCategoriesMap = async () => {
  let collectionRef = collection(db, "categories");
  let _query = query(collectionRef);

  let categoriesSnapshot = await getDocs(_query);
  let categoriesMap = categoriesSnapshot.docs.reduce((acc, _doc) => {
    let { title, items } = _doc.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});

  return categoriesMap;
};

export const registerUserInFirestore = async (user, additionalInformation) => {
  if (!user) return;
  let userRef = doc(db, "users", user.uid);
  let userSnapshot = await getDoc(userRef);
  if (!userSnapshot.exists()) {
    let { displayName, email } = user;
    let createdAt = new Date();
    try {
      await setDoc(userRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log(error.mesage);
    }
  }
  return userRef;
};

export const _createUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const _signInWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const _signOut = async () => await signOut(auth);

export const _onAuthStateChanged = (callback) =>
  onAuthStateChanged(auth, callback);
