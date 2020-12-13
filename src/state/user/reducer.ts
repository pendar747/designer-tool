import { Action } from "redux"

export interface UserState {
  isLoggedIn: boolean
}

export const USER_INITIAL_STATE: UserState = {
  isLoggedIn: false
}

export const userReducer = (state: UserState = USER_INITIAL_STATE, action: Action) => {
  switch (action.type) {
  default:
    return state;
  }
}