import React, { lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import ScrollTopTopContainer from '../components/ScrollTopTopContainer';

function Heros() {
  const OtherComponent = lazy(() => import('./Heros'));
  return (
    <Suspense fallback={''}>
      <OtherComponent />
    </Suspense>
  );
}

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <ScrollTopTopContainer>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/heros" />} />
          <Route path="/heros" component={Heros} />
        </Switch>
      </ScrollTopTopContainer>
    </Router>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
};
export default Root;
