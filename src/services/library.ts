import { Library, NPMConfig } from "../types/library";
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

export const updateLibrary = async ({ name, description, id }: Library) => {
  const { data } = await apiClient.put(`/library/${id}`, { name, description });
  return mapLibrary(data);
}

export const deleteLibrary = async (libraryId: string) => {
  return apiClient.delete(`/library/${libraryId}`);
}

export const addComponent = async (componentId: string, libraryId: string) => {
  return apiClient.post(`/library/${libraryId}/component`, { componentId });
}

export const fetchComponents = async (libraryId: string) => {
  const { data } = await apiClient.get(`/library/${libraryId}/component`);
  return data;
}

export const removeComponent = async (componentId: string, libraryId: string) => {
  return apiClient.delete(`/library/${libraryId}/component/${componentId}`);
}

export const fetchNpmConfig = async (libraryId: string) => {
  const { data } = await apiClient.get(`/library/${libraryId}/npmConfig`);
  return data;
}

export const updateNpmConfig = async (libraryId: string, config: NPMConfig) => {
  const { data } = await apiClient.put(`/library/${libraryId}/npmConfig`, config);
  return data;
}

export const fetchNpmReleases = async (libraryId: string) => {
  const { data } = await apiClient.get(`/library/${libraryId}/npmRelease`);
  return data.map((item: any) => ({
    ...item,
    datePublished: item.datePublished ? new Date(item.datePublished) : null,
    dateRequested: new Date(item.dateRequested)
  }));
}

export const createNpmRelease = async (libraryId: string) => {
  const { data } = await apiClient.post(`/library/${libraryId}/npmRelease`);
  return data;
}