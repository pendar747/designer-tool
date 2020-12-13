import { User } from "../types";
import apiClient from "./apiClient"

interface Args {
  email: string, 
  password: string
}

export const registerUser = async ({ email, password }: Args): Promise<User> => {
  const { data: user } = await apiClient.post('/user', { email, password });
  return user;
}