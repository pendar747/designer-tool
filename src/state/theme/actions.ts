import { Theme } from "../../types/theme";
import { createAsyncAction, createAsyncActionConstant } from "../actionCreators";

export const FETCH_THEMES = createAsyncActionConstant('THEME/FETCH_THEMES');

export const fetchThemeAction = createAsyncAction<void, { themes: Theme[] }>(FETCH_THEMES);