import { createStore, applyMiddleware } from 'redux';
import { browserHistory } from 'react-router';

import rootReducer from '../reducers/';

// Middlewares
import logger from 'redux-logger';
import { routerMiddleware } from 'react-router-redux';

const loggerMiddleware = logger();
const router = routerMiddleware(browserHistory);
const middlewares = [router];
if (process.env.NODE_ENV !== 'production') {
  middlewares.push(loggerMiddleware); // no need for logging in production...
}

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middlewares)
  );
}
