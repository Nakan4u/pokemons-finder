import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import { browserHistory } from 'react-router';
import { NativeRouter as Router, Route, Link } from 'react-router-native';

import reducer from './app/reducers';
import AppContainer from './app/containers.v1/AppContainer';

// middleware that logs actions
const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__ });

function configureStore(initialState) {
  const enhancer = compose(
    applyMiddleware(
      thunkMiddleware, // lets us dispatch() functions
      loggerMiddleware,
    ),
  );
  return createStore(reducer, initialState, enhancer);
}

const store = configureStore({});

const App = () => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={AppContainer} />
    </Router>
  </Provider>
)

AppRegistry.registerComponent('TestApp', () => App);
