import { Library } from "../types/library";
import apiClient from "./apiClient"

export interface CreateLibraryArgs {
  name: string,
  description: string
}

export const createLibrary = async ({ name, description }: CreateLibraryArgs): Promise<Library> => {
  const { data: library } = await apiClient.post('/library', { name, description });
  return {
    ...library,
    createdAt: new Date(library.createdAt),
    lastUpdated: new Date(library.lastUpdated)
  };
}