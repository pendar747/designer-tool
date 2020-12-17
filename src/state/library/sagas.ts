import { call, put, takeLatest } from "redux-saga/effects";
import { createLibrary, CreateLibraryArgs } from "../../services/library";
import { Action } from "../actionCreators";
import { createLibraryAction, CREATE_LIBRARY } from "./actions";

function* createLibrarySaga (action: Action<CreateLibraryArgs>) {
  try {
    const library = yield call(createLibrary, action.payload);
    yield put(createLibraryAction.success(library));
  } catch (error) {
    yield put(createLibraryAction.failure());
  }
}

export default function* sagas () {
  yield takeLatest(CREATE_LIBRARY.request, createLibrarySaga);
}