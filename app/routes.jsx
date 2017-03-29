'use strict';
import React from 'react';
import {
  Switch,
  Route,
} from 'react-router';

import App from "./components/App";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import ChapterList from './components/List';
import ChapterDetails from './components/Details';

export default function createRoutes() {
  return (
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route path="/chapter/:id" component={ChapterList}/>
      <Route path="/chapter/:id/details/:details" component={ChapterDetails}/>
      <Route component={NotFound}/>
    </Switch>
  );
}