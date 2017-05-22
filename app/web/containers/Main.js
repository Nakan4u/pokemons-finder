import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { ActionCreators } from '../../actions';

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pokemonName: this.props.currentPokemonName,
            isLoading: false,
            error: false
        };
    }

    render() {

        return (
            <div>
                <h1>Hello world from react web!</h1>
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
