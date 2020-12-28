import { call, put, select, take, takeLatest } from "redux-saga/effects";
import { fetchThemes } from "../../services/theme";
import { User } from "../../types/user";
import { FETCH_CURRENT_USER } from "../user/actions";
import { selectCurrentUser } from "../user/selectors";
import { fetchThemeAction, FETCH_THEMES } from "./actions";

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

export default function* sagas () {
  yield takeLatest(FETCH_THEMES.request, fetchThemesSaga);
}