import { createSelector } from "reselect";
import { State } from "../store";
import { selectThemes } from "../theme/selectors";

export const selectLibraryState = (state: State) => state.library;

export const selectIsCreateLibraryModalVisible = createSelector(
  selectLibraryState,
  ({ isEditModalVisible: isCreateModalVisible }) => isCreateModalVisible
)

export const selectCreateLibraryState = createSelector(
  selectLibraryState,
  ({ createLibraryState }) => createLibraryState
)

export const selectLibraries = createSelector(
  selectLibraryState,
  ({ libraries }) => libraries
);

export const selectSelectedLibrary = createSelector(
  selectLibraryState,
  ({ selectedLibraryId, libraries }) => libraries.find(({ id }) => id === selectedLibraryId) 
);

export const selectSelectedTheme = createSelector(
  selectSelectedLibrary,
  selectThemes,
  (library, themes) => {
    const defaultTheme = themes.find(theme => theme.libraryId === library?.id && theme.isDefault);
    const selectedTheme = themes.find(theme => theme.id === library?.selectedThemeId);
    return selectedTheme || defaultTheme;
  }
)

export const selectSelectedComponentId = createSelector(
  selectLibraryState,
  ({ selectedComponentId }) => selectedComponentId
)

export const selectSelectedLibraryConfig = createSelector(
  selectLibraryState,
  ({ selectedLibraryId, configs }) => {
    const { config } = configs.find(conf => conf.libraryId === selectedLibraryId) || {};
    return config;
  }
);

export const selectNpmConfigUpdateState = createSelector(
  selectLibraryState,
  ({ npmConfigUpdateState }) => npmConfigUpdateState
);