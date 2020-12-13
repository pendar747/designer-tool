import { call, put, takeLatest } from 'redux-saga/effects';
import { registerUser, RegisterUserArgs } from '../../services/user';
import { Action } from '../actionCreators';
import { registerUserAction, REGISTER_USER } from './actions';

function* registerUserSaga (action: Action<RegisterUserArgs>) {
  try {
    const user = yield call(registerUser, action.payload);
    yield put(registerUserAction.success(user));
  } catch (error) {
    yield put(registerUserAction.failure());
  }
}

function* userSagas () {
  yield takeLatest(REGISTER_USER.request, registerUserSaga);
}

export default userSagas;