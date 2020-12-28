import { Theme } from "../../types/theme";
import { Action } from "../actionCreators";
import { AsyncState } from "../types";
import { CREATE_THEME, FETCH_THEMES, SHOW_CREATE_THEME_MODAL } from "./actions";

export interface ThemeState {
  themes: Theme[],
  fetchThemesState: AsyncState,
  isCreateThemeModalOpen: boolean,
  createThemeLibraryId?: string,
  createThemeState: AsyncState
}

export const THEME_INITIAL_STATE: ThemeState = {
  themes: [],
  fetchThemesState: AsyncState.DEFAULT,
  isCreateThemeModalOpen: false,
  createThemeState: AsyncState.DEFAULT
}

export const themeReducer = (state: ThemeState = THEME_INITIAL_STATE, action: Action<any>): ThemeState => {
  switch (action.type) {
  case FETCH_THEMES.request:
    return {
      ...state,
      fetchThemesState: AsyncState.IN_PROGRESS
    }
  case FETCH_THEMES.failure:
    return {
      ...state,
      fetchThemesState: AsyncState.FAILED
    }
  case FETCH_THEMES.success:
    return {
      ...state,
      fetchThemesState: AsyncState.SUCCESSFUL,
      themes: action.payload.themes
    }
  case SHOW_CREATE_THEME_MODAL:
    return {
      ...state,
      isCreateThemeModalOpen: action.payload.show,
      createThemeLibraryId: action.payload.libraryId
    }
  case CREATE_THEME.success:
    return {
      ...state,
      themes: [...state.themes, action.payload.theme],
      createThemeState: AsyncState.SUCCESSFUL,
      isCreateThemeModalOpen: false
    }
  case CREATE_THEME.request:
    return {
      ...state,
      createThemeState: AsyncState.IN_PROGRESS
    }
  case CREATE_THEME.failure:
    return {
      ...state,
      createThemeState: AsyncState.FAILED
    }
  default:
    return state;
  }
}