import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
// import sessionReducer from './session';

const rootReducer = combineReducers({
    session: sessionReducer,
})

let enhancer;

if(process.env.NODE_ENV)