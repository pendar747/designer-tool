import { AxiosError } from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import { loginUser, registerUser, RegisterUserArgs } from '../../services/user';
import { Action } from '../actionCreators';
import { loginUserAction, LOGIN_USER, registerUserAction, REGISTER_USER } from './actions';

function* registerUserSaga (action: Action<RegisterUserArgs>) {
  try {
    const user = yield call(registerUser, action.payload);
    yield put(registerUserAction.success(user));
  } catch (error) {
    yield put(registerUserAction.failure((error as AxiosError).response.data));
  }
}

function* loginUserSaga (action: Action<RegisterUserArgs>) {
  try {
    const user = yield call(loginUser, action.payload);
    yield put(loginUserAction.success(user));
  } catch (error) {
    yield put(loginUserAction.failure((error as AxiosError).response.data));
  }
}

function* userSagas () {
  yield takeLatest(REGISTER_USER.request, registerUserSaga);
  yield takeLatest(LOGIN_USER.request, loginUserSaga);
}

export default userSagas;