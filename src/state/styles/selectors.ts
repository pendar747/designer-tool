import { createSelector } from "reselect";
import { selectLibraryState, selectSelectedComponentId, selectSelectedTheme } from "../library/selectors";
import { selectThemeState } from "../theme/selectors";
import { AsyncState } from "../types";

export const selectSelectedComponentStyles = createSelector(
  selectSelectedComponentId,
  selectSelectedTheme,
  selectThemeState,
  (componentId, theme, { allStyles }) => {
    const { styles } = allStyles
      .find(item => item.componentId === componentId && item.themeId === theme?.id) || {};
    return styles || [];
  } 
);

export const selectFetchStylesState = createSelector(
  selectThemeState,
  ({ fetchStylesState }) => fetchStylesState
);
