import { call, put, select, takeLatest } from "redux-saga/effects";
import { createLibrary, CreateLibraryArgs, fetchUserLibraries, updateLibrary } from "../../services/library";
import { Library } from "../../types/library";
import { User } from "../../types/user";
import { Action } from "../actionCreators";
import { selectCurrentUser } from "../user/selectors";
import { createLibraryAction, CREATE_LIBRARY, fetchUserLibrariesAction, FETCH_LIBRARIES, UPDATE_LIBRARY, updateLibraryAction } from "./actions";

function* createLibrarySaga (action: Action<CreateLibraryArgs>) {
  try {
    const library = yield call(createLibrary, action.payload);
    yield put(createLibraryAction.success(library));
  } catch (error) {
    yield put(createLibraryAction.failure());
  }
}

function* fetchUserLibrariesSaga () {
  try {
    const user: User = yield select(selectCurrentUser);
    const libraries = yield call(fetchUserLibraries, user.id);
    yield put(fetchUserLibrariesAction.success(libraries));
  } catch (error) {
    yield put(fetchUserLibrariesAction.failure());
  }
}

function* updateLibrarySaga (action: Action<{ library: Library }>) {
  try {
    const updatedLibrary = yield call(updateLibrary, action.payload.library);
    yield put(updateLibraryAction.success({ library: updatedLibrary }));
  } catch (error) {
    yield put(updateLibraryAction.failure());
  }
}

export default function* sagas () {
  yield takeLatest(CREATE_LIBRARY.request, createLibrarySaga);
  yield takeLatest(FETCH_LIBRARIES.request, fetchUserLibrariesSaga);
  yield takeLatest(UPDATE_LIBRARY.request, updateLibrarySaga);
}