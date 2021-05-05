import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session';
import showSectionsReducer from './userSections'

const rootReducer = combineReducers({
    session: sessionReducer,
    sections: showSectionsReducer,
})


///// THIS IS FOR REDUX LOGGER
let enhancer;

if(process.env.NODE_ENV === 'production') {
    enhancer = applyMiddleware(thunk);
} else {
    const logger = require('redux-logger').default;
    const composeEnhancers = 
      window.__REDUX_DEVTOOLS_EXTENSIONS_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer)
}

export default configureStore;