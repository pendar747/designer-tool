import { createSelector } from "reselect";
import { Library } from "../../types/library";
import { State } from "../store";

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