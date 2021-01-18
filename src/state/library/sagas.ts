import { take, call, put, select, takeLatest } from "redux-saga/effects";
import { addComponent, createLibrary, CreateLibraryArgs, deleteLibrary, fetchComponents, fetchNpmConfig, fetchUserLibraries, removeComponent, updateLibrary, updateNpmConfig } from "../../services/library";
import { Library, LibraryComponentPair, NPMConfig } from "../../types/library";
import { User } from "../../types/user";
import { Action } from "../actionCreators";
import { FETCH_CURRENT_USER } from "../user/actions";
import { selectCurrentUser } from "../user/selectors";
import { 
  createLibraryAction, 
  CREATE_LIBRARY, 
  fetchUserLibrariesAction, 
  FETCH_LIBRARIES, 
  UPDATE_LIBRARY, 
  updateLibraryAction, 
  deleteLibraryAction, 
  DELETE_LIBRARY, 
  addComponentAction,
  ADD_COMPONENT,
  fetchComponentsAction,
  FETCH_COMPONENTS,
  removeComponentAction,
  REMOVE_COMPONENT,
  fetchNpmConfigAction,
  updateNpmConfigAction,
  FETCH_NPM_CONFIG,
  UPDATE_NPM_CONFIG
} from "./actions";
import { selectLibraries } from "./selectors";

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
    yield take(FETCH_CURRENT_USER.success);
    const user: User = yield select(selectCurrentUser);
    const libraries: Library[] = yield call(fetchUserLibraries, user.id);
    const oldLibraries: Library[]|undefined = yield select(selectLibraries); 
    const mappedLibraries = libraries.map(library => {
      const { selectedThemeId } = oldLibraries?.find(lib => lib.id === library.id) || {};
      return { ...library, selectedThemeId };
    })
    yield put(fetchUserLibrariesAction.success(mappedLibraries));
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

function* deleteLibrarySaga (action: Action<{ libraryId: string }>) {
  try {
    yield call(deleteLibrary, action.payload.libraryId);
    yield put(deleteLibraryAction.success({ libraryId: action.payload.libraryId }));
  } catch (error) {
    yield put(deleteLibraryAction.failure());
  }
}

function* addComponentSaga (action: Action<{ componentId: string, libraryId: string }>) {
  try {
    yield call(addComponent, action.payload.componentId, action.payload.libraryId);
    yield put(addComponentAction.success(action.payload));
  } catch (error) {
    yield put(addComponentAction.failure());
  }
}

function* fetchComponentsSage (action: Action<{ libraryId: string }>) {
  try {
    yield take(FETCH_LIBRARIES.success);
    const componentIds = yield call(fetchComponents, action.payload.libraryId);
    yield put(fetchComponentsAction.success({ libraryId: action.payload.libraryId, componentIds }));
  } catch (error) {
    yield put(fetchComponentsAction.failure());
  }
}

function* removeComponentSaga (action: Action<LibraryComponentPair>) {
  try {
    yield call(removeComponent, action.payload.componentId, action.payload.libraryId);
    yield put(removeComponentAction.success(action.payload));
  } catch (error) {
    yield put(removeComponentAction.failure());
  }
}

function *fetchNpmConfigSaga (action: Action<{ libraryId: string }>) {
  try {
    const { libraryId } = action.payload;
    const config = yield call(fetchNpmConfig, libraryId);
    yield put(fetchNpmConfigAction.success({ config, libraryId }))
  } catch (error) {
    yield put(fetchNpmConfigAction.failure());
  }
}

function *updateNpmConfigSaga (action: Action<{ libraryId: string, config: NPMConfig }>) {
  try {
    const { libraryId, config } = action.payload;
    const newConfig = yield call(updateNpmConfig, libraryId, config);
    yield put(updateNpmConfigAction.success({ config: newConfig, libraryId }))
  } catch (error) {
    yield put(updateNpmConfigAction.failure());
  }
}

export default function* sagas () {
  yield takeLatest(CREATE_LIBRARY.request, createLibrarySaga);
  yield takeLatest(FETCH_LIBRARIES.request, fetchUserLibrariesSaga);
  yield takeLatest(UPDATE_LIBRARY.request, updateLibrarySaga);
  yield takeLatest(DELETE_LIBRARY.request, deleteLibrarySaga);
  yield takeLatest(ADD_COMPONENT.request, addComponentSaga);
  yield takeLatest(FETCH_COMPONENTS.request, fetchComponentsSage);
  yield takeLatest(REMOVE_COMPONENT.request, removeComponentSaga);
  yield takeLatest(FETCH_NPM_CONFIG.request, fetchNpmConfigSaga);
  yield takeLatest(UPDATE_NPM_CONFIG.request, updateNpmConfigSaga);
}