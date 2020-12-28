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

export const selectLoginState = createSelector(
  selectUserState,
  ({ loginState }) => loginState
);

export const selectCurrentUser = createSelector(
  selectUserState,
  ({ user }) => user
);

export const selectFetchUserState = createSelector(
  selectUserState,
  ({ fetchUserState }) => fetchUserState
);