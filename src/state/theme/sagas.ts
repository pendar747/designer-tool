import { call, put, select, take, takeLatest } from "redux-saga/effects";
import { createTheme, fetchStyles, fetchThemes, updateStyles } from "../../services/theme";
import { StylesBodyPayload, Theme } from "../../types/theme";
import { User } from "../../types/user";
import { Action } from "../actionCreators";
import { FETCH_CURRENT_USER } from "../user/actions";
import { selectCurrentUser } from "../user/selectors";
import { createThemeAction, CREATE_THEME, fetchStylesAction, fetchThemesAction, FETCH_STYLES, FETCH_THEMES, updateStylesAction, UPDATE_STYLES } from "./actions";

function* fetchThemesSaga () {
  try {
    yield take(FETCH_CURRENT_USER.success);
    const user: User = yield select(selectCurrentUser);
    const themes = yield call(fetchThemes, user.id);
    yield put(fetchThemesAction.success({ themes }));
  } catch (error) {
    yield put(fetchThemesAction.failure(error));
  }
}

function* createThemeSaga (action: Action<{ theme: Theme }>) {
  try {
    const theme = yield call(createTheme, action.payload.theme);
    yield put(createThemeAction.success({ theme }));
  } catch (error) {
    yield put(createThemeAction.failure());
  }
}

function* fetchStylesSaga (action: Action<{ componentId: string, themeId: string }>) {
  try {
    const styles = yield call(fetchStyles, action.payload.componentId, action.payload.themeId);
    yield put(fetchStylesAction.success({ 
      styles, 
      componentId: action.payload.componentId, 
      themeId: action.payload.themeId 
    }));
  } catch (error) {
    yield put(fetchStylesAction.failure(error));
  }
}

function* updateStylesSaga (action: Action<StylesBodyPayload>) {
  try {
    const styles = yield call(updateStyles, action.payload);
    yield put(updateStylesAction.success({ 
      styles,
      componentId: action.payload.componentId,
      themeId: action.payload.themeId
    }))
  } catch (error) {
    yield put(updateStylesAction.failure());
  }
}

export default function* sagas () {
  yield takeLatest(FETCH_THEMES.request, fetchThemesSaga);
  yield takeLatest(CREATE_THEME.request, createThemeSaga);
  yield takeLatest(FETCH_STYLES.request, fetchStylesSaga);
  yield takeLatest(UPDATE_STYLES.request, updateStylesSaga);
}