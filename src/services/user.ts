import { User } from "../types";
import apiClient from "./apiClient"

export interface RegisterUserArgs {
  email: string, 
  password: string
}

export const registerUser = async ({ email, password }: RegisterUserArgs): Promise<User> => {
  const { data: user } = await apiClient.post('/user', { email, password });
  return user;
}