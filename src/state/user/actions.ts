import { RegisterUserArgs } from "../../services/user";
import { User } from "../../types";
import { createAsyncAction, createAsyncActionConstant } from "../actionCreators";

export const REGISTER_USER = createAsyncActionConstant('REGISTER_USER');

export const registerUserAction = createAsyncAction<RegisterUserArgs, User>(REGISTER_USER);