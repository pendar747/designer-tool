import { Action } from "../actionCreators";
import { SHOW_CREATE_LIBRARY_MODAL } from "./actions";

export interface LibraryState {
  isCreateModalVisible: boolean
}

export const LIBRARY_INITIAL_STATE: LibraryState = {
  isCreateModalVisible: false
}

export const libraryReducer = (state: LibraryState = LIBRARY_INITIAL_STATE, action: Action<any>): LibraryState => {
  switch (action.type) {
  case SHOW_CREATE_LIBRARY_MODAL:
    return {
      ...state,
      isCreateModalVisible: action.payload
    }
  default:
    return state;
  }
}