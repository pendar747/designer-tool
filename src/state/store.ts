import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { userReducer, UserState } from './user/reducer';

export interface State {
  user: UserState
}

const sagaMiddleware = createSagaMiddleware();

const reducer = combineReducers({
  user: userReducer
});

const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
); 

// then run the saga
// sagaMiddleware.run(mySaga)

export default store;