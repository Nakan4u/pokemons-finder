// main component with login form

import API from '../utils/api.js';
import Dashboard from './Dashboard.js';
import List from './List.js';
import React, { Component } from 'react';
import {
    AppRegistry,
    ActivityIndicator,
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
        marginBottom: 10,
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
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    error: {
        fontSize: 18,
        color: 'red',
        textAlign: 'center'
    }
});

export default class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: 'John',
            userPass: '',
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
        if (this.state.userName && this.state.userPass) {
            this.checkUser();
            
        } else {
            this.setState({ error: 'name and password are required' });
        }
    }
    checkUser() {
        if (this.state.userName === 'John' && this.state.userPass === '1234') {
            this.getList();
        } else {
            this.setState({ error: 'name or password are incorrect' });
            return;
        } 
    }
    getList() {
        API.getList()
            .then((res) => {
                console.log(res);
                this.props.navigator.push({
                    title: "Pokemons list",
                    component: List,
                    passProps: { title: "Pokemons list", pokemonList: res.results }
                });
                this.setState({
                    isLoading: false,
                    error: false
                })
            })
            .catch((error) => { console.error(error) });
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
                    Please login to use this app
                </Text>
                <TextInput
                    style={styles.searchInput}
                    value={this.state.userName}
                    onChangeText={(text) => this.setState({userName: text})} />
                <TextInput
                    style={styles.searchInput}
                    value={this.state.userPass}
                    onChangeText={(text) => this.setState({userPass: text})} />
                <TouchableHighlight
                    style={styles.button}
                    onPress={this.handleSubmit.bind(this)}
                    activeOpacity={disabled ? 0.5 : 1}
                    underlayColor="white">
                    <Text style={styles.buttonText}> Login </Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.button}
                    onPress={this.getList.bind(this)}
                    underlayColor="white">
                    <Text style={styles.buttonText}> Demo </Text>
                </TouchableHighlight>
                <ActivityIndicator
                    animating={this.state.isLoading}
                    color="#111"
                    size="large"></ActivityIndicator>
                {showErr}
            </View>
        );
    }
}

AppRegistry.registerComponent('MainPage', () => MainPage);
