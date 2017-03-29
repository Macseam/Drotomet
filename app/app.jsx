import '../style/app.less';
import 'bootstrap/less/bootstrap.less';
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { syncHistoryWithStore } from "react-router-redux";
import configureStore from './store/configureStore';
import createRoutes from './routes';
import { createBrowserHistory, createHashHistory } from 'history';

const store = configureStore();
const history = process.env.NODE_ENV === 'development'
  ? syncHistoryWithStore(createHashHistory(), store)
  : syncHistoryWithStore(createBrowserHistory(), store);

render(
    <Provider store={store} key="provider">
        <Router history={history}>
          {createRoutes(store)}
        </Router>
    </Provider>, window.document.getElementById('app')
);