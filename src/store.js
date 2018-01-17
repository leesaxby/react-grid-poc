import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// import { combineReducers } from 'redux';
import { combineReducers } from 'redux-immutable';

import { cube, filters } from './modules/list';

const rootReducer = combineReducers({ cube, filters });

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk),
);

export default store;
