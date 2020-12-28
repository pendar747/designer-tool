import { AxiosError } from "axios";
import { User } from "../types/user";
import apiClient from "./apiClient"
import { StatusCodes } from 'http-status-codes';

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

export const fetchCurrentUser = async (): Promise<User|undefined> => {
  try {
    const { data: user } = await apiClient.get('/user/me');
    return user;
  } catch (error) {
    if ((error as AxiosError).response?.status === StatusCodes.UNAUTHORIZED) {
      return undefined
    }
    throw error;
  }
}

export const logOut = async () => {
  return apiClient.get('/user/me/logout');
}