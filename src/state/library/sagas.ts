import { call, put, select, takeLatest } from "redux-saga/effects";
import { createLibrary, CreateLibraryArgs, fetchUserLibraries } from "../../services/library";
import { User } from "../../types/user";
import { Action } from "../actionCreators";
import { selectCurrentUser } from "../user/selectors";
import { createLibraryAction, CREATE_LIBRARY, FETCH_LIBRARIES } from "./actions";

function* createLibrarySaga (action: Action<CreateLibraryArgs>) {
  try {
    const library = yield call(createLibrary, action.payload);
    yield put(createLibraryAction.success(library));
  } catch (error) {
    yield put(createLibraryAction.failure());
  }
}

function* fetchUserLibrariesSaga (action: Action<void>) {
  try {
    const user: User = yield select(selectCurrentUser);
    const libraries = yield call(fetchUserLibraries, user.id);
    yield put(createLibraryAction.success(libraries));
  } catch (error) {
    yield put(createLibraryAction.failure());
  }
}

export default function* sagas () {
  yield takeLatest(CREATE_LIBRARY.request, createLibrarySaga);
  yield takeLatest(FETCH_LIBRARIES.request, fetchUserLibrariesSaga);
}