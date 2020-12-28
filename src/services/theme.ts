import apiClient from "./apiClient"

export const fetchThemes = async (userId: string) => {
  const { data } = await apiClient.get(`/theme?userId=${userId}`);
  return data;
}