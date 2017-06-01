import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { ActionCreators } from '../../actions';
import Badge from '../components/Badge';
import Dashboard from '../../containers.v2/Dashboard';

import { responsiveStyles } from '../../native/styles.general.css.js';
require('./Dashboard.css');

class DashboardWeb extends Dashboard {

    render() {
        return (
            <div className="dashboard container">
                <Badge pokemon={this.state.pokemon} getPokemonsListByTypeHandler={super.getPokemonsListByType.bind(this)}></Badge>
                <div className="buttonsWrapper">
                    <button
                        className="button"
                        onClick={super.toogleFavorites.bind(this)}
                        disabled={this.state.isLoading}>
                        <span className="buttonText"> {this.state.isFavorite ? 'Remove from favorites' : 'Add to favorites'} </span>
                    </button>
                    <button
                        className="button"
                        onClick={super.goToFavorites.bind(this)}>
                        <span className="buttonText"> Go to favorites </span>
                    </button>
                </div>
                <span>{this.state.isLoading ? 'loading...' : ''}</span>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        currentPokemonData: state.currentPokemonData
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DashboardWeb));
