import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import {
    AppRegistry,
    ActivityIndicator,
    Text,
    View,
    ScrollView,
    ListView,
    StyleSheet,
    TouchableHighlight
} from 'react-native';

import { ActionCreators } from '../actions';
import API from '../utils/api.js';
import Separator from '../components/helpers/Separator.js';
import stylesGenerel from '../styles.general.js';

const styles = StyleSheet.create({
    listWrapper: {
        height: 400,
        padding: 10,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#48BBEC'
    },
    listInner: {
        flex: 1,
        justifyContent: 'flex-start',
        padding: 10,
    },
    rowTitle: {
        color: '#48BBEC',
        fontSize: 20,
        padding: 5
    }
});

class List extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            dataSource: ds.cloneWithRows(this.props.pokemonsListData),
            isLoading: false,
            error: false
        };
    }
    goToProfile(pokemonName) {
        if (this.state.isLoading) return; //prevent multiply clicks

        this.setState({isLoading: true});
        this.props.getPokemon(pokemonName)
            .then((res) => {
                if (res.detail === "Not found.") {
                    this.setState({
                        error: 'Pokemon not found',
                        isLoading: false
                    })
                } else {
                    this.setState({
                        isLoading: false,
                        error: false
                    });
                    this.props.setPokemon(res);
                    this.props.history.push('/pokemon');
                }
            })
            .catch((err) => {
                console.error(err);
                this.setState({ isLoading: false });
            });
    }

    render() {
        var showErr = (
            this.state.error ? <Text style={stylesGenerel.error}> {this.state.error} </Text> : <View></View>
        ),
            title = this.props.match.params.type ? this.props.match.params.type + ' pokemons list :' : 'Pokemons list :';

        return (
            <View style={stylesGenerel.container}>
                <Text style={stylesGenerel.title}> {title} </Text>
                {showErr}
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(item, sectionID, rowID) => {
                        var pokemon = item.pokemon ? item.pokemon : item;
                        rowID++; //increase index to begin from 1;
                        
                        return <View key={rowID} style={styles.rowContainer}>
                            <TouchableHighlight
                                onPress={this.goToProfile.bind(this, pokemon.name)}
                                underlayColor="blue">
                                <Text style={styles.rowTitle}> {rowID}. {pokemon.name} </Text>
                            </TouchableHighlight>
                            <Separator></Separator>
                        </View>
                    }} />
                <ActivityIndicator animating={this.state.isLoading} size='large' />
            </View>
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
// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(List));
withRouter(connect(mapStateToProps, mapDispatchToProps)(List));
export default List;

List.propTypes = {
    pokemonsListData: React.PropTypes.array.isRequired
};

AppRegistry.registerComponent('List', () => List);
