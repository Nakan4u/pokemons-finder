import API from '../utils/api.js';
import Dashboard from './Dashboard.js';
import List from './List.js';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import {
    AppRegistry,
    Text,
    StyleSheet,
    TextInput,
    TouchableHighlight,
    TouchableOpacity,
    View
} from 'react-native';


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: 30,
        marginTop: 25,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#48BBEC'
    },
    title: {
        marginBottom: 20,
        fontSize: 25,
        textAlign: 'center',
        color: '#fff'
    },
    instructions: {
        textAlign: 'center',
        color: '#fff',
        marginBottom: 5,
    },
    searchInput: {
        height: 50,
        padding: 10,
        marginRight: 0,
        marginBottom: 15,
        fontSize: 23,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 8,
        color: 'white'
    },
    buttonText: {
        fontSize: 18,
        color: '#111',
        alignSelf: 'center'
    },
    button: {
        height: 50,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 15,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    error: {
        fontSize: 18,
        color: 'red',
        textAlign: 'center'
    }
});

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
    handleSubmit() {
        // update our indicatorIOS spinner
        if (this.state.pokemonName) {
            this.setState({isLoading: true});
            this.props.setCurrentPokemonName(this.state.pokemonName);

            // fetch data from pokemon api
            this.props.getPokemon(this.state.pokemonName)
                .then((res) => {
                    if (res.detail === "Not found.") {
                        this.setState({
                            error: 'Pokemon not found',
                            isLoading: false
                        })
                    } else {
                        this.props.navigator.push({
                            title: res.name || "Pokemon name",
                            component: Dashboard,
                            passProps: { pokemon: res }
                        });
                        this.setState({
                            isLoading: false,
                            error: false
                        })
                    }
                })
        } else {
            this.setState({ error: 'search field shouldn\'t be empty' });
        }
    }
    getList() {
        this.setState({
            isLoading: true
        });
        this.props.getPokemonsList()
            .then((data) => {
                this.props.navigator.push({
                    title: "Pokemons list",
                    component: List,
                    passProps: { title: "Pokemons list", pokemonList: data }
                });
                this.setState({
                    isLoading: false,
                    error: false
                })
            });
    }

    render() {
        var showErr = (
            this.state.error ? <Text style={styles.error}> {this.state.error} </Text> : <View></View>
        ),
            disabled = !this.state.pokemonName;
        return (
            <View style={styles.mainContainer}>
                <Text style={styles.title}>
                    Welcome to Pokemons finder app!
                </Text>
                <Text style={styles.instructions}>
                    Type pokemon name or id to find them
                </Text>
                <TextInput
                    style={styles.searchInput}
                    value={this.state.pokemonName}
                    onChange={this.handleChange.bind(this)} />
                <TouchableHighlight
                    style={styles.button}
                    onPress={this.handleSubmit.bind(this)}
                    activeOpacity={disabled ? 0.5 : 1}
                    underlayColor="white">
                    <Text style={styles.buttonText}> Search </Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.button}
                    onPress={this.getList.bind(this)}
                    underlayColor="white">
                    <Text style={styles.buttonText}> Get pokemon list </Text>
                </TouchableHighlight>
                <Spinner visible={this.state.isLoading} textContent={"Loading..."} textStyle={{ color: '#FFF' }} />
                {showErr}
            </View>
        );
    }
}

function mapStateToProps(state) {
  return {
    currentPokemonName: state.currentPokemonName
  }
}

export default connect(mapStateToProps)(MainPage);

AppRegistry.registerComponent('MainPage', () => MainPage);
