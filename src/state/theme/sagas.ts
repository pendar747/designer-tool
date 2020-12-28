import { call, put, select, take, takeLatest } from "redux-saga/effects";
import { createTheme, fetchThemes } from "../../services/theme";
import { Theme } from "../../types/theme";
import { User } from "../../types/user";
import { Action } from "../actionCreators";
import { FETCH_CURRENT_USER } from "../user/actions";
import { selectCurrentUser } from "../user/selectors";
import { createThemeAction, CREATE_THEME, fetchThemeAction, FETCH_THEMES } from "./actions";

function* fetchThemesSaga () {
  try {
    yield take(FETCH_CURRENT_USER.success);
    const user: User = yield select(selectCurrentUser);
    const themes = yield call(fetchThemes, user.id);
    yield put(fetchThemeAction.success({ themes }));
  } catch (error) {
    console.log(error);
    yield put(fetchThemeAction.failure(error));
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

export default function* sagas () {
  yield takeLatest(FETCH_THEMES.request, fetchThemesSaga);
  yield takeLatest(CREATE_THEME.request, createThemeSaga);
}