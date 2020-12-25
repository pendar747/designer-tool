export interface Library {
  name: string,
  description: string,
  createdAt: Date,
  lastUpdated: Date,
  id: string,
  userId: string,
  componentIds?: string[]
}

export interface LibraryComponentPair {
  libraryId: string,
  componentId: string
} 