import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import * as serviceWorker from './serviceWorker';
import Root from './containers/Root';

import reduxAPI from './middleware/reduxAPI'; // our redux-rest object

const reducer = combineReducers(reduxAPI.reducers);
const store = createStore(
  reducer,
  compose(
    process.env.NODE_ENV === 'production'
      ? applyMiddleware(thunk)
      : applyMiddleware(thunk, createLogger()),
  ),
);

ReactDOM.render(
  <Router>
    <Root store={store} />
  </Router>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
