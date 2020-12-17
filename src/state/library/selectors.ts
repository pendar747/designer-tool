import { createSelector } from "reselect";
import { State } from "../store";

export const selectLibraryState = (state: State) => state.library;

export const selectIsCreateLibraryModalVisible = createSelector(
  selectLibraryState,
  ({ isCreateModalVisible }) => isCreateModalVisible
)