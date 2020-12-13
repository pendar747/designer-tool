import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import sagas from './sagas';
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

sagaMiddleware.run(sagas)

export default store;