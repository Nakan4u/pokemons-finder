import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { ActionCreators } from '../../actions';

// Stylesheets
require('./Main.scss');

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pokemonName: this.props.currentPokemonName,
            isLoading: false,
            error: false
        };
    }

    handleChange(event) {
        this.setState({
            pokemonName: event.nativeEvent.text,
            error: false
        })
    }

    render() {

        return (
            <div className="mainContainer">
                <h1>Welcome to Pokemons finder app!</h1>
                <form name="main">
                    <label htmlFor="pokemonName">Type pokemon name or id to find them</label>
                    <input id="pokemonName" name="pokemonName" type="text" 
                        value={this.state.pokemonName} onChange={this.handleChange.bind(this)} />
                    <button type="submit">Search</button>
                    <button>Get pokemon list</button>
                </form>
            </div>
        );
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
    return {
        currentPokemonName: state.currentPokemonName
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainPage));

// AppRegistry.registerComponent('MainPage', () => MainPage);
