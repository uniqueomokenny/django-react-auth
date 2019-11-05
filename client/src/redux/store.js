import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from './reducers';


const preloadedState = {};

const middleware = [ thunk ];

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    preloadedState,
    composeEnhances(applyMiddleware(...middleware))
);

export default store;