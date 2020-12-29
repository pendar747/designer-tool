import { createSelector } from "reselect";
import { selectSelectedComponentId, selectSelectedTheme } from "../library/selectors";
import { selectThemeState } from "../theme/selectors";

export const selectSelectedComponentStyles = createSelector(
  selectSelectedComponentId,
  selectSelectedTheme,
  selectThemeState,
  (componentId, theme, { allStyles }) => {
    return allStyles.find(item => item.componentId === componentId && item.themeId === theme?.id);
  } 
);