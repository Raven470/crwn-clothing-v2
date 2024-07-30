import { createContext, useEffect, useReducer } from "react";
import {
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
} from "../utils/firebase/firebase.utils";
import { createAction } from "../utils/reducer/reducer.utils";
////////////////// Context API /////////////////////////////
// as the actual value you want to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

////////////////// use Reducer /////////////////////////////
// reducer: action types
export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
};

// reducer: initial state
const INITIAL_STATE = {
  currentUser: null,
};

// reducer: reducer function
const userReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      };
    default:
      throw new Error(`Unhandled type of ${type} in userReducer`);
  }
};

////////////////// Context API /////////////////////////////
// Provider
export const UserProvider = ({ children }) => {
  const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE);

  // setCurrentUser is a function have a parameter named user
  const setCurrentUser = (user) => {
    dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));
  };

  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    // this fn return an unsubscribe fn
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
