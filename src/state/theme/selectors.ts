import { createSelector } from "reselect";
import { State } from "../store";

export const selectThemeState = (state: State) => state.theme; 

export const selectThemes = createSelector(selectThemeState, ({ themes }) => themes);
export const selectFetchThemesState = createSelector(selectThemeState, ({ fetchThemesState }) => fetchThemesState);