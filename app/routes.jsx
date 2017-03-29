'use strict';
import React from 'react';
import {
  Switch,
  Route,
} from 'react-router';

import App from "./components/App";
import Home from "./components/Home";
import LoginPage from "./components/LoginPage";
import NotFound from "./components/NotFound";
import ChapterList from './components/List';
import ChapterDetails from './components/Details';

export default function createRoutes() {
  return (
    <div>
      <Route exact path="/" component={App}/>
      <Route path="/login" component={LoginPage}/>
    </div>
  );
}