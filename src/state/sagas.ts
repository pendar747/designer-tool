import { all } from 'redux-saga/effects';
import userSagas from './user/sagas';
import librarySagas from './library/sagas';
import themeSagas from './theme/sagas';

function* sagas () {
  yield all([
    userSagas(),
    librarySagas(),
    themeSagas()
  ]);
}

export default sagas;