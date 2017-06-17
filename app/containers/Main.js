import React, { Component } from 'react';

export default class MainPage extends Component {
    constructor (props) {
        super(props);
        const {currentPokemonName} = this.props;

        this.state = {
            pokemonName: currentPokemonName,
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
        const {setCurrentPokemonName, getPokemon, setPokemon, history} = this.props;

        if (event) event.preventDefault();
        if (this.state.isLoading) return; // prevent multiply clicks

        if (this.state.pokemonName) {
            this.setState({ isLoading: true });
            setCurrentPokemonName(this.state.pokemonName);

            // fetch data from pokemon api
            getPokemon(this.state.pokemonName)
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
                        setPokemon(res);
                        history.push('/pokemon');
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
        const {getPokemonsList, setPokemonsList, history} = this.props;

        if (event) event.preventDefault();
        if (this.state.isLoading) return; // prevent multiply clicks

        this.setState({ isLoading: true });
        getPokemonsList()
            .then(data => {
                this.setState({
                    isLoading: false,
                    error: false
                });
                setPokemonsList(data);
                history.push('/list');
            })
            .catch(err => {
                console.error(err);
                this.setState({ isLoading: false });
            });
    }
}
