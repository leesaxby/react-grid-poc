import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// import { combineReducers } from 'redux';
import { combineReducers } from 'redux-immutable';

import cube from './modules/list';

const rootReducer = combineReducers({ cube });

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

export default store;
