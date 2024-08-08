import { createSelector } from "reselect";

// import { UserState } from "./user.reducer";

import { RootState } from "../store";

export const selectUserReducer = (state: RootState) => state.user;

export const selectCurrentUser = createSelector(
  [selectUserReducer],
  (user) => user.currentUser
);
