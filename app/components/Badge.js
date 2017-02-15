import React, { Component } from 'react';
import {
    AppRegistry,
    Text,
    StyleSheet,
    Image,
    TouchableHighlight,
    View
} from 'react-native';

const styles = StyleSheet.create({
    container: {
        marginTop: 15,
        flex: 1
    },
    image: {
        height: 200,
        width: 200,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#48BBEC',
        alignSelf: 'center'
    },
    title: {
        fontSize: 24,
        color: '#48BBEC',
        alignSelf: 'center',
        marginBottom: 15
    },
    info: {
        fontSize: 12,
        color: '#48BBEC',
        alignSelf: 'center',
        margin: 10
    },
    type: {
        fontSize: 14,
        lineHeight: 14,
        color: '#fff',
        alignSelf: 'center',
    },
    typeWrapper: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
    }
});

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
