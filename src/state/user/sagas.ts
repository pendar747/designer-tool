import { AxiosError } from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchCurrentUser, loginUser, logOut, registerUser, RegisterUserArgs } from '../../services/user';
import { Action } from '../actionCreators';
import { fetchCurrentUserAction, FETCH_CURRENT_USER, loginUserAction, LOGIN_USER, logOutAction, LOG_OUT, registerUserAction, REGISTER_USER } from './actions';

function* registerUserSaga (action: Action<RegisterUserArgs>) {
  try {
    const user = yield call(registerUser, action.payload);
    yield put(registerUserAction.success(user));
  } catch (error) {
    yield put(registerUserAction.failure((error as AxiosError).response?.data));
  }
}

function* loginUserSaga (action: Action<RegisterUserArgs>) {
  try {
    const user = yield call(loginUser, action.payload);
    yield put(loginUserAction.success(user));
  } catch (error) {
    yield put(loginUserAction.failure((error as AxiosError).response?.data));
  }
}

function* fetchCurrentUserSaga () {
  try {
    const user = yield call(fetchCurrentUser);
    yield put(fetchCurrentUserAction.success(user));
  } catch (error) {
    yield put(fetchCurrentUserAction.failure());
  }
}

function* logOutSaga () {
  try {
    yield call(logOut);
    yield put(logOutAction.success());
  } catch (error) {
    yield put(logOutAction.failure());
  }
}

function* userSagas () {
  yield takeLatest(REGISTER_USER.request, registerUserSaga);
  yield takeLatest(LOGIN_USER.request, loginUserSaga);
  yield takeLatest(FETCH_CURRENT_USER.request, fetchCurrentUserSaga);
  yield takeLatest(LOG_OUT.request, logOutSaga);
}

export default userSagas;