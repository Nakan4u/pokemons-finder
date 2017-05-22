import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Route } from 'react-router-dom';

import Header from './Header';
import { ActionCreators } from '../../actions';
import routes from '../routes.config.js';
import RouteWithSubRoutes from '../../helpers.js';


class AppContainer extends React.Component {

  render() {
    return (
      <div style={{flex: 1, backgroundColor: '#F5FCFF'}}>
        <Header />
        {routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect((state) => { return {} }, mapDispatchToProps)(AppContainer);