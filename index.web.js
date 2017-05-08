import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import reducer from './app/reducers';
import AppContainer from './app/containers.v1/AppContainer.web.js';

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

function configureStore(initialState) {
  const enhancer = composeEnhancers(
    applyMiddleware(
      thunkMiddleware, // lets us dispatch() functions
    ),
  );
  return createStore(
    reducer,
    initialState,
    enhancer
  );
}

const store = configureStore({});

const App = () => (
  <Provider store={store}>
    <AppContainer />
  </Provider>
)

AppRegistry.registerComponent('ReactNativeWeb', () => App);
AppRegistry.runApplication('ReactNativeWeb', { rootTag: document.getElementById('react-app') });
