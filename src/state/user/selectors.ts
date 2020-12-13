import { createSelector } from "reselect";
import { State } from "../store";

const selectUserState = (state: State) => state.user;

export const selectIsLoggedIn = createSelector(
  selectUserState,
  ({ isLoggedIn }) => isLoggedIn
);