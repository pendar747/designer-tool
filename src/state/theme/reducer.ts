import { findIndex } from "lodash";
import { StyleItem, Styles, Theme } from "../../types/theme";
import { Action } from "../actionCreators";
import { AsyncState } from "../types";
import { CREATE_THEME, FETCH_STYLES, FETCH_THEMES, SHOW_CREATE_THEME_MODAL, UPDATE_STYLES } from "./actions";

export interface ThemeState {
  themes: Theme[],
  fetchThemesState: AsyncState,
  isCreateThemeModalOpen: boolean,
  createThemeLibraryId?: string,
  createThemeState: AsyncState,
  allStyles: StyleItem[],
  fetchStylesState: AsyncState,
  updateStylesState: AsyncState
}

export const THEME_INITIAL_STATE: ThemeState = {
  themes: [],
  fetchThemesState: AsyncState.DEFAULT,
  isCreateThemeModalOpen: false,
  createThemeState: AsyncState.DEFAULT,
  allStyles: [],
  fetchStylesState: AsyncState.DEFAULT,
  updateStylesState: AsyncState.DEFAULT
}

const updateAllStyles = (oldStyles: StyleItem[], newStyle: StyleItem) => {
  const index = findIndex(oldStyles, item => item.componentId === newStyle.componentId 
    && item.themeId === newStyle.themeId);
  if (index >= 0) {
    const newStyles = [...oldStyles];
    newStyles.splice(index, 1, newStyle);
    return newStyles;
  }
  return [...oldStyles, newStyle];
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
  case FETCH_STYLES.success:
    return {
      ...state,
      allStyles: updateAllStyles(state.allStyles, action.payload),
      fetchStylesState: AsyncState.SUCCESSFUL
    }
  case FETCH_STYLES.request:
    return {
      ...state,
      fetchStylesState: AsyncState.IN_PROGRESS
    }
  case FETCH_STYLES.failure:
    return {
      ...state,
      fetchStylesState: AsyncState.FAILED
    }
  case UPDATE_STYLES.success:
    return {
      ...state,
      allStyles: updateAllStyles(state.allStyles, action.payload),
      updateStylesState: AsyncState.SUCCESSFUL
    }
  case UPDATE_STYLES.request:
    return {
      ...state,
      updateStylesState: AsyncState.IN_PROGRESS
    }
  case UPDATE_STYLES.failure:
    return {
      ...state,
      updateStylesState: AsyncState.FAILED
    }
  default:
    return state;
  }
}