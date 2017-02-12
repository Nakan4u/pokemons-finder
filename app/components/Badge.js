import styles from './Badge.styles.js';
import React, { Component } from 'react';
import {
    AppRegistry,
    Text,
    Image,
    TouchableHighlight,
    View
} from 'react-native';

export default class Badge extends Component {
    makeBackground(type) {
        var obj = {
            padding: 5,
            margin: 5,
            borderRadius: 10
        }
        if (type === 'electric') {
            obj.backgroundColor = 'gold';
        } else if (type === 'fire') {
            obj.backgroundColor = 'orange';
        } else if (type === 'poison') {
            obj.backgroundColor = 'green';
        } else {
            obj.backgroundColor = 'grey';
        }
        return obj;
    }

    render() {
        var setBackgroundColorByType = function (type) {

        }
        var pokemon = this.props.pokemon;
        var list = pokemon.types.map((item, index) => {
            if (item.type.name) {
                return (
                    <TouchableHighlight key={index}
                        style={this.makeBackground(item.type.name)}
                        onPress={this.props.getPokemonsListByTypeHandler.bind(this, item.type)}>
                        <Text style={styles.type}> {item.type.name} </Text>
                    </TouchableHighlight>
                )
            } else {
                return <View key={index} />
            }
        });
        return (
            <View style={styles.container}>
                <Text style={styles.title}> {pokemon.name} </Text>
                <Image source={{ uri: pokemon.sprites.front_default }} style={styles.image}></Image>
                <Text style={styles.info}> Click on type to get pokemons with same type:</Text>
                <View style={styles.typeWrapper}>
                    {list}
                </View>
            </View>
        );
    }
}
Badge.propTypes = {
    pokemon: React.PropTypes.object.isRequired,
    getPokemonsListByTypeHandler: React.PropTypes.func.isRequired
};

AppRegistry.registerComponent('Badge', () => Badge);
