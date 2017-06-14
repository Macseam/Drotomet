'use strict';
import React from 'react';
import {
  Route,
  IndexRoute,
} from 'react-router';

import AppContainer from "./containers/AppContainer";
import IndexContainer from "./containers/IndexContainer";
import ListContainer from "./containers/ListContainer";
import NotFound from "./components/NotFound";
import ChapterDetails from './components/Details';

export default function createRoutes(store) {
  return (
    <Route path="/" component={AppContainer}>
      <Route path="chapter/:chapter" component={ListContainer}>
        <Route path="details/:details" component={ChapterDetails}/>
      </Route>
      <IndexRoute component={IndexContainer} />
      <Route path="*" component={NotFound}/>
    </Route>
  );
}