import { RegisterUserArgs } from "../../services/user";
import { User } from "../../types";
import { createAsyncAction, createAsyncActionConstant } from "../actionCreators";
import { ErrorResponse } from "../types";

export const REGISTER_USER = createAsyncActionConstant('REGISTER_USER');

export const registerUserAction = createAsyncAction<RegisterUserArgs, User, ErrorResponse>(REGISTER_USER);