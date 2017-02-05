import styles from './Badge.styles.js';
import React, { Component } from 'react';
import {
    AppRegistry,
    Text,
    Image,
    View
} from 'react-native';

export default class Badge extends Component {
    render() {
        var pokemon = this.props.pokemon;
        var list = pokemon.types.map((item, index) => {
            if (item.type.name) {
                return (
                    <View key={index}>
                        <Text style={styles.type}> {item.type.name} </Text>
                    </View>
                )
            } else {
                return <View key={index} />
            }
        });
        return (
            <View style={styles.container}>
                <Text style={styles.title}> {pokemon.name} </Text>
                <Image source={{ uri: pokemon.sprites.front_default }} style={styles.image}></Image>
                <Text style={styles.type}> Type:</Text>
                {list}
            </View>
        );
    }
}
Badge.propTypes = {
    pokemon: React.PropTypes.object.isRequired
};

AppRegistry.registerComponent('Badge', () => Badge);
