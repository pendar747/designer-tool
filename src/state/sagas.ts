import { all } from "redux-saga/effects"
import userSagas from "./user/sagas"

function* sagas () {
  yield all([
    userSagas()
  ]);
}

export default sagas;