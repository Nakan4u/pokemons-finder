import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import {
    AppRegistry,
    ActivityIndicator,
    Text,
    StyleSheet,
    TextInput,
    TouchableHighlight,
    TouchableOpacity,
    View
} from 'react-native';
import { ActionCreators } from '../../actions';
import MainClass from '../../containers/Main';

import stylesGlobal from '../styles.general.css.js';
import stylesLocal from './Main.css.js';

const styles = StyleSheet.create(stylesLocal);
const stylesGenerel = StyleSheet.create(stylesGlobal);

class MainPage extends MainClass {

    render () {
        var showErr
            = this.state.error ? <Text style={stylesGenerel['.error']}> {this.state.error} </Text> : <View></View>,
            disabled = !this.state.pokemonName;

        return (
            <View style={styles['.mainContainer']}>
                <Text style={styles['.title']}>
                    Welcome to Pokemons finder native app!
                </Text>
                <Text style={styles['.instructions']}>
                    Type pokemon name or id to find them
                </Text>
                <TextInput
                    style={styles['.searchInput']}
                    value={this.state.pokemonName}
                    onChange={super.handleChange.bind(this)} />
                <TouchableHighlight
                    style={styles['.button']}
                    onPress={super.handleSubmit.bind(this)}
                    activeOpacity={disabled ? 0.5 : 1}
                    underlayColor="white">
                    <Text style={styles['.buttonText']}> Search </Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles['.button']}
                    onPress={super.getList.bind(this)}
                    underlayColor="white">
                    <Text style={styles['.buttonText']}> Get pokemon list </Text>
                </TouchableHighlight>
                <ActivityIndicator animating={this.state.isLoading} size="large" color="white" />
                {showErr}
            </View>
        );
    }
}

function mapDispatchToProps (dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps (state) {
    return {
        currentPokemonName: state.currentPokemonName
    };
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainPage));

AppRegistry.registerComponent('MainPage', () => MainPage);
