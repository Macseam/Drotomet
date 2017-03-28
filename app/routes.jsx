'use strict';
import React from 'react';
import {
  Route,
  IndexRoute,
  IndexRedirect,
  Redirect,
} from 'react-router';

import AppContainer from 'containers/AppContainer';

export default function createRoutes() {
  return (
    <Route path="/" component={AppContainer}/>
  );
}