import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StyleSheet, View } from 'react-native';
import { Route } from 'react-router-native';

import Header from './Header.native';
import { ActionCreators } from '../../actions';
import routes from '../routes.config.js';
import RouteWithSubRoutes from '../../helpers.js';

import stylesGlobal from '../styles.general.css.js';
const styles = StyleSheet.create(stylesGlobal);

class AppContainer extends React.Component {

  render() {
    return (
      <View style={styles['.appContainer']}>
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