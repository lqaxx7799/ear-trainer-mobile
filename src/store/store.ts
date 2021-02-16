import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { promiseMiddleware } from './middleware';

import allReducers from './';

const getMiddleware = () => {
  if (process.env.NODE_ENV === 'production') {
    return applyMiddleware(thunk, promiseMiddleware);
  } else {
    // Enable additional logging in non-production environments.
    return applyMiddleware(thunk, promiseMiddleware, createLogger());
  }
};

// const composeEnhancers = composeWithDevTools({
//   name: 'Passenger Transportation Web',
//   realtime: true,
//   trace: true,
//   traceLimit: 20,
// });

export const store = createStore(allReducers, getMiddleware());