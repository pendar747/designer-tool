export interface Library {
  name: string,
  description: string,
  createdAt: Date,
  lastUpdated: Date,
  id: string,
  userId: string,
  componentIds?: string[],
  selectedThemeId?: string
}

export interface LibraryComponentPair {
  libraryId: string,
  componentId: string
} 

export interface NPMConfig {
  registry: string|null, 
  scope: string|null,
  accessToken: string|null, 
  libraryId: string,
  isPrivate: boolean
}

export interface LibraryConfig {
  libraryId: string,
  config: {
    npm: NPMConfig
  }
}

export interface NPMRelease {
  libraryId: string,
  version: string,
  datePublished: Date|null,
  dateRequested: Date,
  packageName: string|null,
  publishedBy: string
}