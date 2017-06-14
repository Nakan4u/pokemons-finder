import React, { Component } from 'react';

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pokemon: this.props.currentPokemonData,
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
        if (this.state.isLoading) return; //prevent multiply clicks
        this.setState({ isLoading: true });
        this.props.addFavorite(sendData)
            .then((res) => {
                this.setState({ isLoading: false, isFavorite: true });
                this.showNotification('Pokemon added to your favorites list');
            })
            .catch(() => {
                this.setState({ isLoading: false, error: 'problem whith adding to favorites' });
            })
    }

    removeFromFavorites() {
        var storageId = this.state.storageId;
        if (this.state.isLoading) return; //prevent multiply clicks
        if (storageId) {
            this.setState({ isLoading: true });
            this.props.removeFavorite(storageId)
                .then((res) => {
                    this.setState({ isLoading: false, isFavorite: false });
                    this.showNotification('Pokemon removed from your favorites list');
                })
                .catch(() => {
                    this.setState({ isLoading: false, error: 'err with removing pokemon from favorites' });
                })
        } else return;
    }

    showNotification(msg, type = 'Success') {
        alert(type, msg);
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

        if (this.state.isLoading) return; //prevent multiply clicks
        this.setState({ isLoading: true });

        this.props.getFavoritePokemons()
            .then((res) => {
                convertedData = this._convertData(res); // conver data to be the same as pokemon API list response;
                this.setState({ isLoading: false });
                this.props.setPokemonsList(convertedData);
                this.props.history.push('/list/favorites');
            })
            .catch(() => {
                this.setState({ isLoading: false, error: 'error with getting favorites pokemos API' });
            })
    }

    checkIfPokemonInFavorites() {
        var pokemonName = this.state.pokemon.name;

        if (this.state.isLoading) return; //prevent multiply clicks
        this.setState({ isLoading: true });
        this.props.getFavoritePokemons()
            .then((res) => {
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
            .catch(() => {
                this.setState({ isLoading: false });
            })
    }

    getPokemonsListByType(type) {
        this.setState({ isLoading: true });
        // fetch data from pokemon api
        this.props.getPokemonsListBytype(type.url)
            .then((res) => {
                this.setState({ isLoading: false });
                if (res.detail === "Not found.") {
                    this.setState({
                        error: 'Pokemons not found'
                    })
                } else {
                    this.setState({
                        error: false,
                        pokemonName: ''
                    });
                    this.props.setPokemonsList(res.pokemon);
                    this.props.history.push('/list/' + type.name);
                }
            })
            .catch(() => {
                this.setState({ isLoading: false });
            });
    }
}

Dashboard.propTypes = {
    currentPokemonData: React.PropTypes.object.isRequired
};
