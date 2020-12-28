import { createSelector } from "reselect";
import { State } from "../store";

export const selectThemeState = (state: State) => state.theme; 

export const selectThemes = createSelector(selectThemeState, ({ themes }) => themes);
export const selectFetchThemesState = createSelector(selectThemeState, ({ fetchThemesState }) => fetchThemesState);
export const selectIsCreateThemeModalOpen = createSelector(
  selectThemeState,
  ({ isCreateThemeModalOpen }) => isCreateThemeModalOpen
);
export const selectCreateThemeState = createSelector(
  selectThemeState,
  ({ createThemeState }) => createThemeState
); 
export const selectCreateThemeLibraryId = createSelector(
  selectThemeState,
  ({ createThemeLibraryId }) => createThemeLibraryId
)