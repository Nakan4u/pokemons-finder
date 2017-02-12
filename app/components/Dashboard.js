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
            isFavorite: this.props.isFavorite || false,
            storageId: undefined,
            isLoading: false,
            error: false
        };
    }
    componentDidMount() {
        this.checkIfPokemonInFavorites();
    }

    addToFavorites() {
        var sendData = {
            name: this.state.pokemon.name,
            id: this.state.pokemon.id
        }
        this.setState({ isLoading: true });
        API.addFavoritePokeon(sendData)
            .then((res) => {
                console.log('sucess', res);
                this.setState({ isLoading: false, isFavorite: true });
            })
            .catch((err) => {
                console.log('error');
                this.setState({ isLoading: false, error: 'problem whith adding to favorites' });
            })
    }

    removeFromFavorites() {
        var storageId = this.state.storageId;

        if (storageId) {
            this.setState({ isLoading: true });
            API.removeFavoritePokeon(storageId)
                .then((res) => {
                    console.log('sucess', res);
                    this.setState({ isLoading: false, isFavorite: false });
                })
                .catch((err) => {
                    console.log('error');
                    this.setState({ isLoading: false, error: 'err' });
                })
        } else return;
    }

    toogleFavorites() {
        if (this.state.isLoading) {
            return;
        }
        if (this.state.isFavorite) {
            this.removeFromFavorites();
        } else {
            this.addToFavorites();
        }
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
                result.push({ pokemon: data[prop] });
            }
            return result;
        } else return;
    }

    goToFavorites() {
        var convertedData;

        this.setState({ isLoading: true });

        API.getFavoritePokemons()
            .then((res) => {
                console.log('favorites', res);
                convertedData = this._convertData(res); // conver data to be the same as pokemon API list response;
                this.setState({ isLoading: false });
                this.props.navigator.push({
                    title: "Favorites list",
                    component: List,
                    passProps: { title: "Favorites list", pokemonList: convertedData }
                });
            })
            .catch((err) => {
                console.error(err);
                this.setState({ isLoading: false, error: 'error with getting favorites pokemos API' });
            })
    }

    checkIfPokemonInFavorites() {
        var pokemonName = this.state.pokemon.name;

        if (this.state.isFavorite) {
            return;
        } else {
            this.setState({ isLoading: true });
            API.getFavoritePokemons()
                .then((res) => {
                    console.log('favorites', res);
                    // check if pokemon already mentioned in favorites list obj
                    for (var prop in res) {
                        if (pokemonName === res[prop].name) {
                            this.setState({ isLoading: false, isFavorite: true, storageId: prop });
                            return true;
                        }
                    }
                    return false;
                })
                .catch((err) => {
                    console.error(err);
                    this.setState({ isLoading: false });
                })
        }
    }

    getPokemonsListByType(type) {
        this.setState({ isLoading: true });
        // fetch data from pokemon api
        API.getListBytype(type.url)
            .then((res) => {
                if (res.detail === "Not found.") {
                    this.setState({
                        error: 'Pokemons not found',
                        isLoading: false
                    })
                } else {
                    console.log("pokemons list by type ", res);
                    this.props.navigator.push({
                        title: type.name || "",
                        component: List,
                        passProps: { title: type.name + " pokemons list", pokemonList: res.pokemon }
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
                {/*<TouchableHighlight
                    style={styles.button}
                    onPress={this.goToProfile.bind(this)}
                    underlayColor="orange">
                    <Text style={styles.buttonText}> Get pokemon profile </Text>
                </TouchableHighlight>*/}
                <TouchableHighlight
                    style={styles.button}
                    onPress={this.toogleFavorites.bind(this)}
                    activeOpacity={this.state.isLoading ? 0.5 : 1}
                    underlayColor="blue">
                    <Text style={styles.buttonText}> {this.state.isFavorite ? 'Remove from favorites' : 'Add to favorites'} </Text>
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
