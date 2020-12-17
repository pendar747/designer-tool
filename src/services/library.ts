import { Library } from "../types/library";
import apiClient from "./apiClient"

export interface CreateLibraryArgs {
  name: string,
  description: string
}

const mapLibrary = (library: any): Library => ({
  ...library,
  createdAt: new Date(library.createdAt),
  lastUpdated: new Date(library.lastUpdated)
});

export const fetchUserLibraries = async (userId: string): Promise<Library[]> => {
  const { data } = await apiClient.get(`/library?userId=${userId}`)
  return data.map(mapLibrary);
}

export const createLibrary = async ({ name, description }: CreateLibraryArgs): Promise<Library> => {
  const { data } = await apiClient.post('/library', { name, description });
  return mapLibrary(data);
}