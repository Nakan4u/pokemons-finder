import Main from './Main';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  AppRegistry,
  StyleSheet,
  Text,
  NavigatorIOS,
  View
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  }
});

class AppContainer extends React.Component {

  render() {
    console.log('cont state:', this.props.appLoadingState);
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Pokemons finder',
          component: Main,
          passProps: { ...this.props },
        }} />
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect((state) => {return {}}, mapDispatchToProps)(AppContainer);