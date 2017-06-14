'use strict';
import React from 'react';
import {
  Route,
  IndexRoute,
} from 'react-router';

import AppContainer from "./containers/AppContainer";
import StartPage from "./components/StartPage";
import ScorePage from "./components/ScorePage";
import NotFound from "./components/NotFound";

export default function createRoutes(store) {
  return (
    <Route path="/" component={AppContainer}>
      <Route component={StartPage}/>
      <Route path="game" component={ScorePage}/>
      <IndexRoute component={StartPage} />
      <Route path="*" component={NotFound}/>
    </Route>
  );
}