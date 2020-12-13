import { createAsyncAction } from "../actionCreators";

export const REGISTER_USER = 'REGISTER_USER';

export const registerUserAction = createAsyncAction(REGISTER_USER);