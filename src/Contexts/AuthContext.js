import React, { useContext, useState, useEffect } from "react";
import {
  auth,
  TwitterAuthProvider,
  FacebookAuthProvider,
  GoogleAuthProvider,
} from "../../firebase.config";
import PropTypes from "prop-types";

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password, displayName) {
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        return user.updateProfile({ displayName });
      });
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function loginWithTwitter() {
    return auth.signInWithPopup(TwitterAuthProvider);
  }

  function loginWithFacebook() {
    return auth.signInWithPopup(FacebookAuthProvider);
  }

  function loginWithGoogle() {
    return auth.signInWithPopup(GoogleAuthProvider);
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  async function deleteAccount() {
    await currentUser.delete();
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    loginWithTwitter,
    loginWithFacebook,
    loginWithGoogle,
    logout,
    resetPassword,
    updatePassword,
    deleteAccount,
  };

  return React.createElement(
    AuthContext.Provider,
    { value: value },
    !loading && children
  );
}
