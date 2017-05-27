import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import { ActionCreators } from '../../actions';
import List from '../../containers.v1/List';

class ListWeb extends List {


    render() {
        var showErr = (
            this.state.error ? <p style={stylesGenerel.error}> {this.state.error} </p> : <p></p>
        ),
            title = this.props.match.params.type ? this.props.match.params.type + ' pokemons list :' : 'Pokemons list :';

        var listItems;

        if (this.props.pokemonsListData.length) {
            listItems = this.props.pokemonsListData.map((item, index) => {
                var pokemon = item.pokemon ? item.pokemon : item;

                return <li className="rowContainer" key={index}>
                    <a href="#" className="rowTitle"
                        onClick={super.goToProfile.bind(this, pokemon.name)}>
                        {pokemon.name}
                    </a>
                </li>
            })
        };

        return (
            <div className="general container">
                <h1> {title} </h1>
                {showErr}
                <ol>
                    {listItems}
                </ol>
                <span>{this.state.isLoading ? 'loading...' : ''}</span>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        pokemonsListData: state.pokemonsListData
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListWeb));

ListWeb.propTypes = {
    pokemonsListData: React.PropTypes.array.isRequired
};
