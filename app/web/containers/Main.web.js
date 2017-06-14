import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { ActionCreators } from '../../actions';
import MainPage from '../../containers/Main';

import { responsiveStyles } from '../../native/containers/Main.css.js';
require('./Main.css');

class MainPageWeb extends MainPage {

    handleChange(event) {
        this.setState({
            pokemonName: event.nativeEvent.target.value,
            error: false
        })
    }

    render() {
        var showErr = (
            this.state.error ? <p className="error">{this.state.error} </p> : <p></p>
        );

        return (
            <div className="mainContainer">
                <h1 className="title">Welcome to Pokemons finder web app!</h1>
                <form className="mainForm" name="main">
                    <label className="instructions" htmlFor="pokemonName">Type pokemon name or id to find them: </label>
                    <input id="pokemonName" className="searchInput" name="pokemonName" type="text"
                        value={this.state.pokemonName} onChange={this.handleChange.bind(this)} />
                    <button className="button" onClick={super.handleSubmit.bind(this)} disabled={!this.state.pokemonName}>
                        <span className="buttonText">Search</span>
                    </button>
                    <button className="button" onClick={super.getList.bind(this)}>
                        <span className="buttonText">Get pokemon list</span>
                    </button>
                </form>
                <span>{this.state.isLoading ? 'loading...' : ''}</span>
                {showErr}
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainPageWeb));
// export default withRouter(MainPageWeb);
