import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { ActionCreators } from '../../actions';
import MainPage from '../../containers.v1/Main';

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
                <h1>Welcome to Pokemons finder web app!</h1>
                <form name="main">
                    <label htmlFor="pokemonName">Type pokemon name or id to find them</label>
                    <input id="pokemonName" name="pokemonName" type="text" 
                        value={this.state.pokemonName} onChange={this.handleChange.bind(this)} />
                    <button onClick={super.handleSubmit.bind(this)} disabled={!this.state.pokemonName}>Search</button>
                    <button onClick={super.getList.bind(this)}>Get pokemon list</button>
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
