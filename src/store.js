import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';


const rootReducer = combineReducers({ });

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

export default store;
