import { RegisterUserArgs } from "../../services/user";
import { User } from "../../types/user";
import { createAsyncAction, createAsyncActionConstant } from "../actionCreators";
import { ErrorResponse } from "../types";

export const REGISTER_USER = createAsyncActionConstant('USER/REGISTER_USER');
export const LOGIN_USER = createAsyncActionConstant('USER/LOGIN_USER');
export const FETCH_CURRENT_USER = createAsyncActionConstant('USER/FETCH_CURRENT_USER');
export const LOG_OUT = createAsyncActionConstant('USER/LOG_OUT');

export const registerUserAction = createAsyncAction<RegisterUserArgs, User, ErrorResponse>(REGISTER_USER);
export const loginUserAction = createAsyncAction<RegisterUserArgs, User, ErrorResponse>(LOGIN_USER);
export const fetchCurrentUserAction = createAsyncAction<void, User|undefined>(FETCH_CURRENT_USER);
export const logOutAction = createAsyncAction(LOG_OUT);