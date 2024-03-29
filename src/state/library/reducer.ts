import { Action } from "../actionCreators";
import { ADD_COMPONENT, CREATE_LIBRARY, CREATE_NPM_RELEASE, DELETE_LIBRARY, FETCH_COMPONENTS, FETCH_LIBRARIES, FETCH_NPM_CONFIG, FETCH_NPM_RELEASES, REMOVE_COMPONENT, SELECT_COMPONENT, SELECT_LIBRARY, SELECT_THEME, SHOW_CREATE_LIBRARY_MODAL, UPDATE_LIBRARY, UPDATE_NPM_CONFIG } from "./actions";
import { Library, LibraryConfig, NPMConfig, NPMRelease } from '../../types/library';
import { AsyncState } from "../types";

export interface LibraryState {
  isEditModalVisible: boolean,
  libraries: Library[],
  createLibraryState: AsyncState,
  fetchLibrariesState: AsyncState,
  updateLibraryState: AsyncState,
  selectedLibraryId?: string
  deleteLibraryState: AsyncState,
  addComponentState: AsyncState,
  fetchComponentState: AsyncState,
  removeComponentState: AsyncState,
  selectedComponentId?: string,
  npmConfigUpdateState?: AsyncState,
  configs: LibraryConfig[],
  npmReleases: NPMRelease[],
  createNpmReleaseState: AsyncState
}

export const LIBRARY_INITIAL_STATE: LibraryState = {
  isEditModalVisible: false,
  libraries: [],
  configs: [],
  createLibraryState: AsyncState.DEFAULT,
  fetchLibrariesState: AsyncState.DEFAULT,
  updateLibraryState: AsyncState.DEFAULT,
  deleteLibraryState: AsyncState.DEFAULT,
  addComponentState: AsyncState.DEFAULT,
  fetchComponentState: AsyncState.DEFAULT,
  removeComponentState: AsyncState.DEFAULT,
  npmConfigUpdateState: AsyncState.DEFAULT,
  createNpmReleaseState: AsyncState.DEFAULT,
  npmReleases: []
}

const updateNpmConfig = (configs: LibraryConfig[], libraryId: string, npmConfig: NPMConfig): LibraryConfig[] => {
  const configIndex = configs.findIndex(config => config.libraryId === libraryId);
  if (configIndex >= 0) {
    const newConfigs = [...configs]; 
    const oldConfig = configs[configIndex];
    newConfigs.splice(configIndex, 1, { ...oldConfig, config: { ...oldConfig, npm: npmConfig } });
    return newConfigs;
  }
  return [...configs, { libraryId, config: { npm: npmConfig } }];
}

export const libraryReducer = (state: LibraryState = LIBRARY_INITIAL_STATE, action: Action<any>): LibraryState => {
  switch (action.type) {
  case CREATE_LIBRARY.request:
    return {
      ...state,
      createLibraryState: AsyncState.IN_PROGRESS  
    }
  case CREATE_LIBRARY.success:
    return {
      ...state,
      createLibraryState: AsyncState.SUCCESSFUL,
      libraries: [...state.libraries, action.payload],
      isEditModalVisible: false
    }
  case CREATE_LIBRARY.failure:
    return {
      ...state,
      createLibraryState: AsyncState.FAILED  
    }
  case FETCH_LIBRARIES.request:
    return {
      ...state,
      fetchLibrariesState: AsyncState.IN_PROGRESS
    }
  case FETCH_LIBRARIES.success:
    return {
      ...state,
      fetchLibrariesState: AsyncState.SUCCESSFUL,
      libraries: action.payload 
    }
  case FETCH_LIBRARIES.failure:
    return {
      ...state,
      fetchLibrariesState: AsyncState.FAILED
    }
  case SHOW_CREATE_LIBRARY_MODAL:
    return {
      ...state,
      isEditModalVisible: action.payload.show,
      selectedLibraryId: action.payload.libraryId
    }
  case UPDATE_LIBRARY.request:
    return {
      ...state,
      updateLibraryState: AsyncState.SUCCESSFUL  
    }
  case UPDATE_LIBRARY.failure:
    return {
      ...state,
      updateLibraryState: AsyncState.FAILED
    }
  case UPDATE_LIBRARY.success:
    return {
      ...state,
      isEditModalVisible: false,
      libraries: state.libraries.map(library => library.id === action.payload.library.id 
        ? action.payload.library
        : library),
      updateLibraryState: AsyncState.SUCCESSFUL
    }
  case DELETE_LIBRARY.request:
    return {
      ...state,
      deleteLibraryState: AsyncState.IN_PROGRESS
    }
  case DELETE_LIBRARY.failure:
    return {
      ...state,
      deleteLibraryState: AsyncState.FAILED
    }
  case DELETE_LIBRARY.success:
    return {
      ...state,
      deleteLibraryState: AsyncState.SUCCESSFUL,
      libraries: state.libraries.filter(({ id }) => id !== action.payload.libraryId)
    }
  case ADD_COMPONENT.request:
    return {
      ...state,
      addComponentState: AsyncState.IN_PROGRESS
    }
  case ADD_COMPONENT.success:
    return {
      ...state,
      addComponentState: AsyncState.SUCCESSFUL,
      libraries: state.libraries.map(library => {
        return library.id === action.payload.libraryId
          ? {
            ...library,
            componentIds: [...(library.componentIds || []), action.payload.componentId]
          }
          : library
      })
    }
  case ADD_COMPONENT.failure:
    return {
      ...state,
      addComponentState: AsyncState.FAILED
    }
  case FETCH_COMPONENTS.request:
    return {
      ...state,
      fetchComponentState: AsyncState.IN_PROGRESS
    }
  case FETCH_COMPONENTS.success:
    return {
      ...state,
      fetchComponentState: AsyncState.SUCCESSFUL,
      libraries: state.libraries.map(library => {
        return library.id === action.payload.libraryId
          ? {
            ...library,
            componentIds: action.payload.componentIds
          }
          : library;
      })
    }
  case FETCH_COMPONENTS.failure:
    return {
      ...state,
      fetchComponentState: AsyncState.FAILED
    }
  case SELECT_LIBRARY:
    return {
      ...state,
      selectedLibraryId: action.payload.libraryId
    }
  case REMOVE_COMPONENT.request:
    return {
      ...state,
      removeComponentState: AsyncState.IN_PROGRESS
    };
  case REMOVE_COMPONENT.success:
    return {
      ...state,
      removeComponentState: AsyncState.SUCCESSFUL,
      libraries: state.libraries.map(library => {
        return library.id === action.payload.libraryId
          ? {
            ...library,
            componentIds: library.componentIds?.filter(id => id !== action.payload.componentId)
          }
          : library
      })
    };
  case REMOVE_COMPONENT.failure:
    return {
      ...state,
      removeComponentState: AsyncState.FAILED
    }
  case SELECT_THEME:
    return {
      ...state,
      libraries: state.libraries.map(library => library.id === action.payload.libraryId
        ? { ...library, selectedThemeId: action.payload.themeId }
        : library
      )
    }
  case SELECT_COMPONENT:
    return {
      ...state,
      selectedComponentId: action.payload.componentId
    }
  case FETCH_NPM_CONFIG.success:
    return {
      ...state,
      configs: updateNpmConfig(state.configs, action.payload.libraryId, action.payload.config)
    }
  case UPDATE_NPM_CONFIG.success:
    return {
      ...state,
      configs: updateNpmConfig(state.configs, action.payload.libraryId, action.payload.config),
      npmConfigUpdateState: AsyncState.SUCCESSFUL
    }
  case UPDATE_NPM_CONFIG.request:
    return {
      ...state,
      npmConfigUpdateState: AsyncState.IN_PROGRESS
    }
  case UPDATE_NPM_CONFIG.failure:
    return {
      ...state,
      npmConfigUpdateState: AsyncState.FAILED
    }
  case FETCH_NPM_RELEASES.success:
    return {
      ...state,
      npmReleases: action.payload.releases
    }
  case CREATE_NPM_RELEASE.success:
    return {
      ...state,
      createNpmReleaseState: AsyncState.SUCCESSFUL
    }
  case CREATE_NPM_RELEASE.request: 
    return {
      ...state,
      createNpmReleaseState: AsyncState.IN_PROGRESS
    }
  case CREATE_NPM_RELEASE.failure:
    return {
      ...state,
      createNpmReleaseState: AsyncState.FAILED
    }
  default:
    return state;
  }
}