import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import {
    AppRegistry,
    ActivityIndicator,
    Text,
    StyleSheet,
    Image,
    TouchableHighlight,
    View
} from 'react-native';

import { ActionCreators } from '../../actions';
import API from '../../utils/api';
import Badge from '../components/Badge.native';
import DashboardClass from '../../containers.v2/Dashboard';

import stylesGenerel from '../styles.general.css.js';

const styles = StyleSheet.create(stylesGenerel);

class Dashboard extends DashboardClass {

    render() {
        return (
            <View style={styles['.container']}>
                <Badge pokemon={this.state.pokemon} getPokemonsListByTypeHandler={this.getPokemonsListByType.bind(this)}></Badge>                
                <TouchableHighlight
                    style={styles['.button']}
                    onPress={this.toogleFavorites.bind(this)}
                    activeOpacity={this.state.isLoading ? 0.5 : 1}
                    underlayColor="blue">
                    <Text style={styles['.buttonText']}> {this.state.isFavorite ? 'Remove from favorites' : 'Add to favorites'} </Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles['.button']}
                    onPress={this.goToFavorites.bind(this)}
                    underlayColor="blue">
                    <Text style={styles['.buttonText']}> Go to favorites </Text>
                </TouchableHighlight>
                <ActivityIndicator animating={this.state.isLoading} size='large' />
            </View>
        );
    }
}

function mapStateToProps(state) {
  return {
    currentPokemonData: state.currentPokemonData
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));

AppRegistry.registerComponent('Dashboard', () => Dashboard);
