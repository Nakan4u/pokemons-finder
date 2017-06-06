import React, { Component } from 'react';
import {
    AppRegistry,
    Text,
    StyleSheet,
    Image,
    TouchableHighlight,
    View
} from 'react-native';
import BadgeClass from '../../components/Badge';
import stylesLocal from './Badge.css.js';
import stylesGlobal from '../styles.general.css.js';

const styles = StyleSheet.create(stylesLocal);
const stylesGenerel = StyleSheet.create(stylesGlobal);

export default class Badge extends BadgeClass {

    render() {
        var pokemon = this.props.pokemon;
        var list = pokemon.types.map((item, index) => {
            if (item.type.name) {
                return (
                    <View key={index} style={styles['.typeInner']}>
                        <TouchableHighlight
                            style={this.makeBackground(item.type.name)}
                            onPress={this.props.getPokemonsListByTypeHandler.bind(this, item.type)}>
                            <Text style={styles['.type']}> {item.type.name} </Text>
                        </TouchableHighlight>
                    </View>
                )
            } else {
                return <View key={index} />
            }
        });
        return (
            <View style={styles['.badgeContainer']}>
                <Text style={stylesGenerel['.title']}> {pokemon.name} </Text>
                <Image source={{ uri: pokemon.sprites.front_default }} style={styles['.image']}></Image>
                <Text style={styles['.info']}> Type to get pokemons list with same type:</Text>
                <View style={styles['.typeWrapper']}>
                    {list}
                </View>
            </View>
        );
    }
}

AppRegistry.registerComponent('Badge', () => Badge);
