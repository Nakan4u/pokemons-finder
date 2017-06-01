import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Route } from 'react-router-dom';

import Header from './Header.web';
import { ActionCreators } from '../../actions';
import routes from '../routes.config.js';
import RouteWithSubRoutes from '../../helpers.js';

import { generalStyles } from '../../native/styles.general.css.js';

class AppContainer extends React.Component {

  render() {
    return (
      <div className="appContainer">
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