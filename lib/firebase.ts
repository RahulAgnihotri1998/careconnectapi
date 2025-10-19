// lib/firebase.ts
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";

// ✅ Your actual Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDS6YAlyuhqNTBSI8sc8WGtDstfMRpvJwM",
  authDomain: "restate-e3f87.firebaseapp.com",
  databaseURL: "https://restate-e3f87-default-rtdb.firebaseio.com",
  projectId: "restate-e3f87",
  storageBucket: "restate-e3f87.firebasestorage.app",
  messagingSenderId: "665770718753",
  appId: "1:665770718753:web:402cadc010bf3777cad560",
  measurementId: "G-L7W73QREND",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

// Collections
export const collections = {
  AGENT: "agents",
  PROPERTY: "properties",
  GALLERY: "galleries",
  REVIEW: "reviews",
};

// 🔐 Authentication
export async function loginWithGoogle() {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error("Google login failed:", error);
    return null;
  }
}

export async function logout() {
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    console.error("Logout failed:", error);
    return false;
  }
}

export function getCurrentUser() {
  return auth.currentUser;
}

// 🏡 Firestore Helpers
export async function getLatestProperties(limitNumber = 5) {
  const propertiesRef = collection(db, collections.PROPERTY);
  const q = query(
    propertiesRef,
    orderBy("createdAt", "desc"),
    limit(limitNumber)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function getPropertyById(id: string) {
  const docRef = doc(db, collections.PROPERTY, id);
  const snap = await getDoc(docRef);
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

export async function addDocument(collectionName: string, data: any) {
  const colRef = collection(db, collectionName);
  const docRef = await addDoc(colRef, data);
  return { id: docRef.id, ...data };
}

// 🖼️ File upload helper
export async function uploadFile(filePath: string, file: Blob | Uint8Array) {
  const fileRef = ref(storage, filePath);
  await uploadBytes(fileRef, file);
  return await getDownloadURL(fileRef);
}
