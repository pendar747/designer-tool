import { User } from "../types/user";
import apiClient from "./apiClient"

export interface RegisterUserArgs {
  email: string, 
  password: string
}

export const registerUser = async ({ email, password }: RegisterUserArgs): Promise<User> => {
  const { data: user } = await apiClient.post('/user', { email, password });
  return user;
}

export const loginUser = async ({ email, password }: RegisterUserArgs): Promise<User> => {
  const { data: user } = await apiClient.post('/user/me/login', { email, password });
  return user;
}

export const fetchCurrentUser = async (): Promise<User> => {
  const { data: user } = await apiClient.get('/user/me');
  return user;
}