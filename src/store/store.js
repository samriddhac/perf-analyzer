import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducers/AppReducers';
//import sagas from './sagas';

const sagaMiddleware = createSagaMiddleware();

export default createStore(
  reducer
)