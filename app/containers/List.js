import React, { Component } from 'react';

export default class List extends Component {
    constructor (props) {
        super(props);
        this.state = {
            isLoading: false,
            error: false
        };
    }
    goToProfile (pokemonName) {
        const {getPokemon, setPokemon, history} = this.props;

        if (this.state.isLoading) return; // prevent multiply clicks

        this.setState({isLoading: true});
        getPokemon(pokemonName)
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
    }
}

List.propTypes = {
    pokemonsListData: React.PropTypes.array.isRequired
};
