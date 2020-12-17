import { Action } from "../actionCreators";
import { CREATE_LIBRARY, SHOW_CREATE_LIBRARY_MODAL } from "./actions";
import { Library } from '../../types/library';
import { AsyncState } from "../types";

export interface LibraryState {
  isCreateModalVisible: boolean,
  libraries: Library[],
  createLibraryState: AsyncState
}

export const LIBRARY_INITIAL_STATE: LibraryState = {
  isCreateModalVisible: false,
  libraries: [],
  createLibraryState: AsyncState.DEFAULT
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
  case SHOW_CREATE_LIBRARY_MODAL:
    return {
      ...state,
      isCreateModalVisible: action.payload
    }
  default:
    return state;
  }
}