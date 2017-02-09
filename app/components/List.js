import styles from '../general.styles.js';
import Dashboard from './Dashboard.js';
import Separator from './helpers/Separator.js';
import React, { Component } from 'react';
import {
    AppRegistry,
    Text,
    View,
    ScrollView,
    TouchableHighlight
} from 'react-native';

export default class List extends Component {
    constructor(props) {
        super(props);
    }
    goToProfile(pokemon) {
        this.props.navigator.push({
            title: pokemon.name || "Pokemon name",
            component: Dashboard,
            passProps: { pokemon: pokemon }
        });
    }

    render() {
        var pokemonList = this.props.pokemonList;
        var list = [];
        var getList = () => {
            var counter = 0, item;
            for (item in pokemonList) {
                counter++;
                list.push(
                    <View key={counter}>
                        <View style={styles.rowContainer}>
                            <TouchableHighlight
                                onPress={this.goToProfile.bind(this, pokemonList[item])}
                                underlayColor="blue">
                                <Text style={styles.rowContent}> {pokemonList[item].name} </Text>
                            </TouchableHighlight>
                            <Separator></Separator>
                        </View>
                    </View>
                )
            }
        }
        getList();
        return (
            <View style={styles.container}>
                <Text style={styles.title}> Favorites list: </Text>
                <ScrollView>
                    {list}
                </ScrollView>
            </View>
        );
    }
}
List.propTypes = {
    pokemonList: React.PropTypes.object.isRequired
};

AppRegistry.registerComponent('List', () => List);
