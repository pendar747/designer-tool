import { StyleItem, Styles, StylesBodyPayload, Theme } from "../../types/theme";
import { createAsyncAction, createAsyncActionConstant, createUIAction } from "../actionCreators";

export const FETCH_THEMES = createAsyncActionConstant('THEME/FETCH_THEMES');
export const SHOW_CREATE_THEME_MODAL = 'THEME/SHOW_CREATE_THEME_MODAL';
export const CREATE_THEME = createAsyncActionConstant('THEME/CREATE_THEME');
export const UPDATE_STYLES = createAsyncActionConstant('THEME/UPDATE_STYLES');
export const FETCH_STYLES = createAsyncActionConstant('THEME/FETCH_STYLES');

export const fetchThemeAction = createAsyncAction<void, { themes: Theme[] }>(FETCH_THEMES);
export const showCreateThemeModalAction = createUIAction<{ show: boolean, libraryId?: string }>(SHOW_CREATE_THEME_MODAL);
export const createThemeAction =  createAsyncAction<{ theme: Theme }, { theme: Theme }>(CREATE_THEME);
export const updateStylesAction = createAsyncAction<StylesBodyPayload, StyleItem>(UPDATE_STYLES);
export const fetchStylesAction = createAsyncAction<{ componentId: string, themeId: string }, StyleItem>(FETCH_STYLES);