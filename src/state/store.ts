import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { LibraryState, libraryReducer } from './library/reducer';
import sagas from './sagas';
import { ThemeState, themeReducer } from './theme/reducer';
import { userReducer, UserState } from './user/reducer';

export interface State {
  user: UserState,
  library: LibraryState,
  theme: ThemeState
}

const sagaMiddleware = createSagaMiddleware();

const reducer = combineReducers({
  user: userReducer,
  library: libraryReducer,
  theme: themeReducer
});

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(
  applyMiddleware(
    sagaMiddleware
  ),
)); 

sagaMiddleware.run(sagas)

export default store;