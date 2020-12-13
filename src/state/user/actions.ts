import { RegisterUserArgs } from "../../services/user";
import { User } from "../../types/user";
import { createAsyncAction, createAsyncActionConstant } from "../actionCreators";
import { ErrorResponse } from "../types";

export const REGISTER_USER = createAsyncActionConstant('REGISTER_USER');
export const LOGIN_USER = createAsyncActionConstant('LOGIN_USER');
export const FETCH_CURRENT_USER = createAsyncActionConstant('FETCH_CURRENT_USER');

export const registerUserAction = createAsyncAction<RegisterUserArgs, User, ErrorResponse>(REGISTER_USER);
export const loginUserAction = createAsyncAction<RegisterUserArgs, User, ErrorResponse>(LOGIN_USER);
export const fetchCurrentUserAction = createAsyncAction<void, User>(FETCH_CURRENT_USER);