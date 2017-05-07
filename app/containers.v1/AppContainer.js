import Main from './Main';
import Dashboard from './Dashboard';
import List from './List';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { browserHistory } from 'react-router'
import { NativeRouter, Route, Link } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  header: {
    fontSize: 20,
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
});

const AppContainer = () => (
  <NativeRouter history={browserHistory}>
    <View style={styles.container}>
      <View style={styles.nav}>
        <Link
          to="/"
          style={styles.navItem}>
            <Text>Go to Home</Text>
        </Link>
      </View>

      <Route exact path="/" component={Main}/>
      <Route path="/pokemon" component={Dashboard}/>
      <Route exact path="/list" component={List}/>
      <Route path="/list/:type" component={List}/>
    </View>
  </NativeRouter>
);


function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect((state) => {return {}}, mapDispatchToProps)(AppContainer);