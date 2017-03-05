import API from '../utils/api.js';
import styles from '../general.styles.js';
import Badge from './Badge.js';
import List from './List.js';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-simple-toast';
import React, { Component } from 'react';
import {
    AppRegistry,
    AlertIOS,
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
                console.log('Pokemon added ', res);
                this.setState({ isLoading: false, isFavorite: true });
                this.showNotification('Pokemon added to your favorites list');
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
                    console.log('Pokemon removed ', res);
                    this.setState({ isLoading: false, isFavorite: false });
                    this.showNotification('Pokemon removed from your favorites list');
                })
                .catch((err) => {
                    console.log('error');
                    this.setState({ isLoading: false, error: 'err' });
                })
        } else return;
    }
    
    showNotification(msg, type = 'Success') {
        console.log( type, msg );
        Toast.show(msg);
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
                this.setState({ isLoading: false });
                return false;
            })
            .catch((err) => {
                console.error(err);
                this.setState({ isLoading: false });
            })
    }

    getPokemonsListByType(type) {
        this.setState({ isLoading: true });
        // fetch data from pokemon api
        API.getListBytype(type.url)
            .then((res) => {
                this.setState({ isLoading: false });
                if (res.detail === "Not found.") {
                    this.setState({
                        error: 'Pokemons not found'
                    })
                } else {
                    console.log("pokemons list by type ", res);
                    this.props.navigator.push({
                        title: type.name || "",
                        component: List,
                        passProps: { title: type.name + " pokemons list", pokemonList: res.pokemon }
                    });
                    this.setState({
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
                <Spinner visible={this.state.isLoading} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
            </View>
        );
    }
}
Dashboard.propTypes = {
    pokemon: React.PropTypes.object.isRequired
};

AppRegistry.registerComponent('Dashboard', () => Dashboard);
