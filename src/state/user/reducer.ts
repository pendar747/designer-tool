import { Action } from "../actionCreators";
import { AsyncState, ErrorResponse } from "../types";
import { REGISTER_USER } from "./actions";

export interface UserState {
  isLoggedIn: boolean,
  registerUserState: AsyncState,
  errorCode: string|undefined,
  errorMessage: string|undefined
}

export const USER_INITIAL_STATE: UserState = {
  isLoggedIn: false,
  registerUserState: AsyncState.DEFAULT,
  errorCode: undefined,
  errorMessage: undefined
}

export const userReducer = (state: UserState = USER_INITIAL_STATE, action: Action<any>): UserState => {
  switch (action.type) {
  case REGISTER_USER.request:
    return {
      ...state,
      registerUserState: AsyncState.IN_PROGRESS,
      errorCode: undefined,
      errorMessage: undefined
    }
  case REGISTER_USER.failure:
    return {
      ...state,
      registerUserState: AsyncState.FAILED,
      errorMessage: (action.payload as ErrorResponse).message,
      errorCode: (action.payload as ErrorResponse).errorCode
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