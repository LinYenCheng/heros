import React from 'react';
import { HashRouter as Router, Route, Redirect } from 'react-router-dom';
import HeroList from './HeroList';

const Root = () => (
  <Router>
    <Route exact path="/" render={() => <Redirect to="/heros" />} />
    <Route path="/heros" component={HeroList} />
  </Router>
);

export default Root;
