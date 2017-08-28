'use strict';

import { createStore, compose, applyMiddleware } from 'redux';
import { hashHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from '../redux/reducers';

const logger = createLogger({
  diff: true,
  level: {
    prevState: () => `info`,
    action: () => `log`,
    error: () => `error`,
    nextState: () => `info`,
  },
  colors: {
    prevState: () => `#FFEB3B`,
    action: () => `red`,
    nextState: () => `#4CAF50`,
  },
  duration: true,
  collapsed: true
});

const router = routerMiddleware(hashHistory);

const enhancer = compose( applyMiddleware(thunk, router, logger) );

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, enhancer);

  if (module.hot) {
    module.hot.accept('../redux/reducers', () =>
      store.replaceReducer(require('../redux/reducers').default)
    );
  }

  return store;
}
