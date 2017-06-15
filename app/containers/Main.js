import React, { Component } from 'react';

export default class MainPage extends Component {
    constructor (props) {
        super(props);
        this.state = {
            pokemonName: this.props.currentPokemonName,
            isLoading: false,
            error: false
        };
    }

    handleChange (event) {
        this.setState({
            pokemonName: event.nativeEvent.text,
            error: false
        });
    }
    handleSubmit (event) {
        if (event) event.preventDefault();
        if (this.state.isLoading) return; // prevent multiply clicks

        if (this.state.pokemonName) {
            this.setState({ isLoading: true });
            this.props.setCurrentPokemonName(this.state.pokemonName);

            // fetch data from pokemon api
            this.props.getPokemon(this.state.pokemonName)
                .then(res => {
                    if (res.detail === 'Not found.')
                        this.setState({
                            error: 'Pokemon not found',
                            isLoading: false
                        });
                    else {
                        this.setState({
                            isLoading: false,
                            error: false
                        });
                        this.props.setPokemon(res);
                        this.props.history.push('/pokemon');
                    }
                })
                .catch(err => {
                    console.error(err);
                    this.setState({ isLoading: false });
                });
        } else
            this.setState({ error: 'search field shouldn\'t be empty' });
    }
    getList (event) {
        if (event) event.preventDefault();
        if (this.state.isLoading) return; // prevent multiply clicks

        this.setState({ isLoading: true });
        this.props.getPokemonsList()
            .then(data => {
                this.setState({
                    isLoading: false,
                    error: false
                });
                this.props.setPokemonsList(data);
                this.props.history.push('/list');
            })
            .catch(err => {
                console.error(err);
                this.setState({ isLoading: false });
            });
    }
}
