import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StyleSheet, View } from 'react-native';
import { Route } from 'react-router-native';

import Header from './Header';
import { ActionCreators } from '../actions';
import routes from '../native/routes.config.js';
import RouteWithSubRoutes from '../helpers.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  }
});

class AppContainer extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Header />
        {routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect((state) => { return {} }, mapDispatchToProps)(AppContainer);