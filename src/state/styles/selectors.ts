import { createSelector } from "reselect";
import { selectSelectedComponentId, selectSelectedTheme } from "../library/selectors";
import { selectThemeState, selectThemeStyles } from "../theme/selectors";

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

export const selectSelectedThemeStyles = createSelector(
  selectThemeStyles,
  selectSelectedTheme,
  (themeStyles, theme) => themeStyles.find(themeStyles => themeStyles.themeId === theme?.id)
);