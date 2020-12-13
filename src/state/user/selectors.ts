import { createSelector } from "reselect";
import { State } from "../store";

const selectUserState = (state: State) => state.user;

export const selectIsLoggedIn = createSelector(
  selectUserState,
  ({ isLoggedIn }) => isLoggedIn
);

export const selectRegisterUserState = createSelector(
  selectUserState,
  ({ registerUserState }) => registerUserState
)

export const selectError = createSelector(
  selectUserState,
  ({ errorMessage, errorCode }) => ({ message: errorMessage, code: errorCode })
)