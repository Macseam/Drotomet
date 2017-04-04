'use strict';
import React from 'react';
import {
  Route,
  IndexRoute,
} from 'react-router';

import AppContainer from "./containers/AppContainer";
import IndexContainer from "./containers/IndexContainer";
import LoginPage from "./components/LoginPage";
import NotFound from "./components/NotFound";
import ChapterList from './components/List';
import ChapterDetails from './components/Details';

export default function createRoutes(store) {
  return (
    <Route path="/" component={AppContainer}>
      <Route path="login" component={LoginPage}/>
      <Route path="chapter/:chapter" component={ChapterList}>
        <Route path="details/:details" component={ChapterDetails}/>
      </Route>
      <IndexRoute component={IndexContainer} />
      <Route path="*" component={NotFound}/>
    </Route>
  );
}