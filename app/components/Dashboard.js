import API from '../utils/api.js';
import styles from '../general.styles.js';
import Profile from './Profile.js';
import Badge from './Badge.js';
import List from './List.js';
import React, { Component } from 'react';
import {
    AppRegistry,
    ActivityIndicator,
    Text,
    Image,
    TouchableHighlight,
    View
} from 'react-native';

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pokemon: this.props.pokemon,
            isLoading: false,
            error: false
        };
    }
    // solve problem with context on Api promises;
    addToFavorites(context) {
        var that = this;
        var sendData = {
            name: this.state.pokemon.name,
            id: this.state.pokemon.id
        }
        this.setState = {isLoading: true};
        API.addFavoritePokeon(sendData)
            .then((res) => {
                console.log('sucess', res);
                // that.setState({isLoading: false});
            })
            .catch((err) => {
                console.log('error');
                // that.setState({isLoading: false, error: 'problem whith adding to favorites'});
            })
    }
    goToProfile() {
        // this.props.navigator.push({
        //     title: "Profile",
        //     component: Profile,
        //     passProps: { pokemon: this.state.pokemon }
        // });
    }

    _convertData(data) {
        var result = [];
        if (typeof data === 'object') {
            for (var prop in data) {
                result.push({pokemon: data[prop]});
            }
            return result;
        } else return;
    }
    // solve problem with context on Api promises;
    goToFavorites(context) {
        var that = this,
            convertedData;
        this.setState = {isLoading: true};

        API.getFavoritePokemons()
            .then((res) => {
                console.log('favorites', res);
                convertedData = this._convertData(res); // conver data to be the same as pokemon API list response;
                // that.setState({
                //     isLoading: false
                // })
                that.props.navigator.push({
                    title: "Favorites list",
                    component: List,
                    passProps: { pokemonList: convertedData }
                });
            })
            .catch((err) => {
                console.error(err);
                // that.setState({isLoading: false, error: 'err with getting favorites pokemos API'})
            })
    }

    getPokemonsListByType(type){
        this.setState({
            isLoading: true
        });
        // fetch data from pokemon api
        API.getListBytype(type.url)
            .then((res) => {
                if (res.detail === "Not found.") {
                    this.setState({
                        error: 'Pokemons not found',
                        isLoading: false
                    })
                } else {
                    console.log("pokemons list by type ",res);
                    this.props.navigator.push({
                        title: type.name || "",
                        component: List,
                        passProps: { pokemonList: res.pokemon }
                    });
                    this.setState({
                        isLoading: false,
                        error: false,
                        pokemonName: ''
                    })
                }
            })
            .catch((error) => { console.error(error) });
    }
    render() {
        return (
            <View style={styles.container}>
                <Badge pokemon={this.state.pokemon} getPokemonsListByTypeHandler={this.getPokemonsListByType.bind(this)}></Badge>
                <ActivityIndicator
                    animating={this.state.isLoading}
                    color="#111"
                    size="large"></ActivityIndicator>
                <TouchableHighlight
                    style={styles.button}
                    onPress={this.goToProfile.bind(this)}
                    underlayColor="orange">
                    <Text style={styles.buttonText}> Get pokemon profile </Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.button}
                    onPress={this.addToFavorites.bind(this)}
                    underlayColor="green">
                    <Text style={styles.buttonText}> Add to favorites </Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.button}
                    onPress={this.goToFavorites.bind(this)}
                    underlayColor="blue">
                    <Text style={styles.buttonText}> Go to favorites </Text>
                </TouchableHighlight>
            </View>
        );
    }
}
Dashboard.propTypes = {
    pokemon: React.PropTypes.object.isRequired
};

AppRegistry.registerComponent('Dashboard', () => Dashboard);
