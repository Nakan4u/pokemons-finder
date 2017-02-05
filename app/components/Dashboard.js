import API from '../utils/api.js';
import styles from '../general.styles.js';
import Profile from './Profile.js';
import Badge from './Badge.js';
import List from './List.js';
import React, { Component } from 'react';
import {
    AppRegistry,
    ActivityIndicator,
    Text,
    Image,
    TouchableHighlight,
    View
} from 'react-native';

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pokemon: this.props.pokemon,
            favorites: {},
            isLoading: false,
            error: false
        };
    }
    addToFavorites() {
        API.addFavoritePokeon(this.state.pokemon)
            .then((res) => {
                console.log('sucess', res);
            })
            .catch(() => {
                console.log('error');
            })
    }
    goToProfile() {
        this.props.navigator.push({
            title: "Profile",
            component: Profile,
            passProps: { pokemon: this.state.pokemon }
        });
    }

    goToFavorites() {
        var that = this;
        this.setState = {isLoading: true};

        API.getFavoritePokemons()
            .then((res) => {
                console.log('favorites', res);
                // that.setState({ // ToDo discover why that.setState dosn't work
                //     favorites: res,
                //     isLoading: false
                // })
                that.props.navigator.push({
                    title: "Favorites list",
                    component: List,
                    passProps: { pokemonList: res }
                });
            })
            .catch((err) => {
                console.error(err);
                // that.setState({
                //     isLoading: false
                // })
            })
    }
    render() {
        return (
            <View style={styles.container}>
                <Badge pokemon={this.state.pokemon}></Badge>
                <ActivityIndicator
                    animating={this.state.isLoading}
                    color="#111"
                    size="large"></ActivityIndicator>
                <TouchableHighlight
                    style={styles.button}
                    onPress={this.goToProfile.bind(this)}
                    underlayColor="orange">
                    <Text style={styles.buttonText}> Get pokemon profile </Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.button}
                    onPress={this.addToFavorites.bind(this)}
                    underlayColor="green">
                    <Text style={styles.buttonText}> Add to favorites </Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.button}
                    onPress={this.goToFavorites.bind(this)}
                    underlayColor="blue">
                    <Text style={styles.buttonText}> Go to favorites </Text>
                </TouchableHighlight>
            </View>
        );
    }
}
Dashboard.propTypes = {
    pokemon: React.PropTypes.object.isRequired
};

AppRegistry.registerComponent('Dashboard', () => Dashboard);
