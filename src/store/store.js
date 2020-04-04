import { createStore, compose, applyMiddleware } from 'redux';
import { createStateSyncMiddleware, initStateWithPrevTab } from 'redux-state-sync';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducers/AppReducers';
//import sagas from './sagas';

const sagaMiddleware = createSagaMiddleware();
const config = {
  
};
const middlewares = [createStateSyncMiddleware(config)]
const store = createStore(
  reducer,
  {}, 
  applyMiddleware(...middlewares)
);

initStateWithPrevTab(store);

export default store;