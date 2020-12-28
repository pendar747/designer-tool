import { Theme } from "../types/theme";
import apiClient from "./apiClient"

export const fetchThemes = async (userId: string) => {
  const { data } = await apiClient.get(`/theme?userId=${userId}`);
  return data;
}

export const createTheme = async (theme: Theme): Promise<Theme> => {
  const { data } = await apiClient.post('/theme', theme);
  return data;
}