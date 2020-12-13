import { Action } from "redux"
import { AsyncState } from "../types";
import { REGISTER_USER } from "./actions";

export interface UserState {
  isLoggedIn: boolean,
  registerUserState: AsyncState
}

export const USER_INITIAL_STATE: UserState = {
  isLoggedIn: false,
  registerUserState: AsyncState.DEFAULT
}

export const userReducer = (state: UserState = USER_INITIAL_STATE, action: Action): UserState => {
  switch (action.type) {
  case REGISTER_USER.request:
    return {
      ...state,
      registerUserState: AsyncState.IN_PROGRESS
    }
  case REGISTER_USER.failure:
    return {
      ...state,
      registerUserState: AsyncState.FAILED
    };
  case REGISTER_USER.success:
    return {
      ...state,
      registerUserState: AsyncState.SUCCESSFUL
    }
  default:
    return state;
  }
}