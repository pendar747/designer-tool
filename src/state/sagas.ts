import { all } from 'redux-saga/effects';
import userSagas from './user/sagas';
import librarySagas from './library/sagas';

function* sagas () {
  yield all([
    userSagas(),
    librarySagas()
  ]);
}

export default sagas;