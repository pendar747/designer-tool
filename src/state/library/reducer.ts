import { Action } from "../actionCreators";
import { CREATE_LIBRARY, FETCH_LIBRARIES, SHOW_CREATE_LIBRARY_MODAL } from "./actions";
import { Library } from '../../types/library';
import { AsyncState } from "../types";

export interface LibraryState {
  isCreateModalVisible: boolean,
  libraries: Library[],
  createLibraryState: AsyncState,
  fetchLibrariesState: AsyncState
}

export const LIBRARY_INITIAL_STATE: LibraryState = {
  isCreateModalVisible: false,
  libraries: [],
  createLibraryState: AsyncState.DEFAULT,
  fetchLibrariesState: AsyncState.DEFAULT
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
      isCreateModalVisible: false
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
      isCreateModalVisible: action.payload
    }
  default:
    return state;
  }
}