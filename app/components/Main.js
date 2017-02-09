import API from '../utils/api.js';
import Dashboard from './Dashboard.js';
import styles from './Main.styles.js';
import React, { Component } from 'react';
import {
    AppRegistry,
    ActivityIndicator,
    Text,
    TextInput,
    TouchableHighlight,
    View
} from 'react-native';

export default class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pokemonName: '2', //pikachu
            isLoading: false,
            error: false
        };
    }
    handleChange(event) {
        this.setState({
            pokemonName: event.nativeEvent.text
        })
    }
    handleSubmit() {
        // update our indicatorIOS spinner
        this.setState({
            isLoading: true
        });
        console.log('SUMBIT', this.state.pokemonName);
        // fetch data from pokemon api
        API.getInfo(this.state.pokemonName)
            .then((res) => {
                if (res.detail === "Not found.") {
                    this.setState({
                        error: 'Pokemon not found',
                        isLoading: false
                    })
                } else {
                    console.log(res);
                    this.props.navigator.push({
                        title: res.name || "Pokemon name",
                        component: Dashboard,
                        passProps: { pokemon: res }
                    });
                    this.setState({
                        isLoading: false,
                        error: false,
                        pokemonName: ''
                    })
                }
            })
            .catch((error) => { console.error(error) });
        // rerout to the next passing that pokemon information
    }
    render() {
        var showErr = (
            this.state.error ? <Text style={styles.error}> {this.state.error} </Text> : <View></View>
        );
        return (
            <View style={styles.mainContainer}>
                <Text style={styles.title}>
                    Welcome to Pokemons finder app!
                </Text>
                <Text style={styles.instructions}>
                    Type pokemon name or id to find them
                </Text>
                <TextInput
                    style={styles.searchInput}
                    value={this.state.pokemonName}
                    onChange={this.handleChange.bind(this)} />
                <TouchableHighlight
                    style={styles.button}
                    onPress={this.handleSubmit.bind(this)}
                    underlayColor="white">
                    <Text style={styles.buttonText}> SEARCH </Text>
                </TouchableHighlight>
                <ActivityIndicator
                    animating={this.state.isLoading}
                    color="#111"
                    size="large"></ActivityIndicator>
                {showErr}
            </View>
        );
    }
}

AppRegistry.registerComponent('MainPage', () => MainPage);
