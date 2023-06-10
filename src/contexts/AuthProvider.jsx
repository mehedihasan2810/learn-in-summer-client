import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  updateProfile,
  signInWithRedirect,
} from "firebase/auth";
import { auth } from "../configs/firebase/firebase";

export const AuthContext = createContext();

const gooleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [isSignInSignUpModalOpen, setIsSignInSignUpModalOpen] = useState(false);

  const toggleSignInSignUpModal = () => {
    setIsSignInSignUpModalOpen(!isSignInSignUpModalOpen);
  };

  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const updateUserProfile = (user, name, url) => {
    return updateProfile(user, {
      displayName: name,
      photoURL: url,
    });
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleSignIn = () => {
    return signInWithRedirect(auth, gooleProvider);
  };

  const logOut = () => {
    return signOut(auth);
  };


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsAuthLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isSignInSignUpModalOpen,
        toggleSignInSignUpModal,
        isAuthLoading,
        setIsAuthLoading,
        signUp,
        updateUserProfile,
        signIn,
        googleSignIn,
        logOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
