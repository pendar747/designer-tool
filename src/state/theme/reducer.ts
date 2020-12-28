import { Theme } from "../../types/theme";
import { Action } from "../actionCreators";
import { AsyncState } from "../types";
import { FETCH_THEMES } from "./actions";

export interface ThemeState {
  themes: Theme[],
  fetchThemesState: AsyncState
}

export const THEME_INITIAL_STATE: ThemeState = {
  themes: [],
  fetchThemesState: AsyncState.DEFAULT
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
  default:
    return state;
  }
}