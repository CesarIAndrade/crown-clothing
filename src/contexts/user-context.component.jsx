import { createContext, useState, useEffect } from "react";
import {
  _onAuthStateChanged,
  registerUserInFirestore,
} from "../utils/firebase/firebase.component";

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
  let [currentUser, setCurrentUser] = useState(null);
  let value = { currentUser, setCurrentUser };

  useEffect(() => {
    let unsubscribe = _onAuthStateChanged((user) => {
      if (user) {
        registerUserInFirestore(user);
      }
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
