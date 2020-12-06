import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();

const reducer = combineReducers({

});

const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
); 

// then run the saga
// sagaMiddleware.run(mySaga)

export default store;