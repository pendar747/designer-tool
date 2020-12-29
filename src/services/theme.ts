import { Styles, StylesBodyPayload, Theme } from "../types/theme";
import apiClient from "./apiClient"

export const fetchThemes = async (userId: string) => {
  const { data } = await apiClient.get(`/theme?userId=${userId}`);
  return data;
}

export const createTheme = async (theme: Theme): Promise<Theme> => {
  const { data } = await apiClient.post('/theme', theme);
  return data;
}

export const fetchStyles = async (componentId: string, themeId: string): Promise<Styles> => {
  const { data } = await apiClient.get(`/theme/${themeId}/styles?componentId=${componentId}`);
  return data;
}

export const updateStyles = async (payload: StylesBodyPayload): Promise<Styles> => {
  const { data } = await apiClient.post(`/theme/${payload.themeId}/styles`, payload);
  return data;
}