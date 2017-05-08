import Main from './Main';
import Dashboard from './Dashboard';
import List from './List';
import Header from './Header';
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
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  }
});

class AppContainer extends React.Component {

  render() {
    return (
      <Router history={browserHistory}>
        <View style={styles.container}>
          <Header />

          <Route exact path="/" component={Main} />
          <Route path="/pokemon" component={Dashboard} />
          <Route exact path="/list" component={List} />
          <Route path="/list/:type" component={List} />
        </View>
      </Router>
    );
  }
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect((state) => { return {} }, mapDispatchToProps)(AppContainer);