import Main from './app/components/Main';
import React, { Component } from 'react';
import { createStore } from 'redux';
import pokeApp from './app/reducers'

const store = createStore(
  pokeApp
);

import {
  AppRegistry,
  StyleSheet,
  Text,
  NavigatorIOS,
  View
} from 'react-native';

class TestApp extends React.Component {
  render() {
    console.log(store.getState());
    return (
      <NavigatorIOS
        style={styles.container}
        store={store}
        initialRoute={{
          title: 'Pokemons finder',
          component: Main
        }} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  }
});

AppRegistry.registerComponent('TestApp', () => TestApp);
