import firebase from "firebase/compat/app";
import "firebase/auth";

import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { getFirestore } from "firebase/firestore";
import { useState, useEffect, useContext, createContext } from "react";

const app = firebase.initializeApp({
  apiKey: "AIzaSyD4Uhj1tL2EPYZZUw2qTSu3mUwV5RaAuuo",
  authDomain: "auth-test-34cbd.firebaseapp.com",
  projectId: "auth-test-34cbd",
  storageBucket: "auth-test-34cbd.appspot.com",
  messagingSenderId: "483575061323",
  appId: "1:483575061323:web:1ff039b1262cfb534766ce"
});
const db = getFirestore(app);
export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [user, setUser] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), setUser, setError);
    return () => unsubscribe();
  }, []);
  return <AuthContext.Provider value={{ user, error }} {...props} />;
};

export const useAuthState = () => {
  const auth = useContext(AuthContext);
  return { ...auth, isAuthenticated: auth.user != null };
};

export const auth = app.auth;

export { app };
export default db;
