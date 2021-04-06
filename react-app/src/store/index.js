import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
// import sessionReducer from './session';

const rootReducer = combineReducers({
    // session: sessionReducer,
})


///// THIS IS FOR REDUX LOGGER
// let enhancer;

// if(process.env.NODE_ENV === 'production') {
//     enhancer = applyMiddleware(thunk);
// } else {
//     const composeEnhancers = 
//       window.__REDUX_DEVTOOLS_EXTENSIONS_COMPOSE__ || compose;
//     enhancer = composeEnhancers(applyMiddleware(thunk, logger));
// }

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState)
}

export default configureStore;