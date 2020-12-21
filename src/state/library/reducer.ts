import { Action } from "../actionCreators";
import { CREATE_LIBRARY, DELETE_LIBRARY, FETCH_LIBRARIES, SHOW_CREATE_LIBRARY_MODAL, UPDATE_LIBRARY } from "./actions";
import { Library } from '../../types/library';
import { AsyncState } from "../types";

export interface LibraryState {
  isEditModalVisible: boolean,
  libraries: Library[],
  createLibraryState: AsyncState,
  fetchLibrariesState: AsyncState,
  updateLibraryState: AsyncState,
  selectedLibraryId?: string
  deleteLibraryState: AsyncState
}

export const LIBRARY_INITIAL_STATE: LibraryState = {
  isEditModalVisible: false,
  libraries: [],
  createLibraryState: AsyncState.DEFAULT,
  fetchLibrariesState: AsyncState.DEFAULT,
  updateLibraryState: AsyncState.DEFAULT,
  deleteLibraryState: AsyncState.DEFAULT
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
      libraries: state.libraries.filter(({ id }) => id === action.payload.libraryId)
    }
  default:
    return state;
  }
}