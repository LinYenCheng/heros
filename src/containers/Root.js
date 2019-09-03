import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { HashRouter as Router, Route, Redirect } from 'react-router-dom';
import HeroList from '../components/HeroList';

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Route exact path="/" render={() => <Redirect to="/heros" />} />
      <Route path="/heros" component={HeroList} />
    </Router>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
};
export default Root;
