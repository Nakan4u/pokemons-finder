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
            flexDirection: 'column',
            // alignSelf: 'stretch',
            justifyContent: 'center',
            flex: 1,
            height: 25,
            marginRight: 5,
            borderWidth: 1,
            borderColor: 'black',
            borderRadius: 10
        }
        if (type === 'electric') {
            obj.backgroundColor = 'yellow';
        } else if (type === 'fire') {
            obj.backgroundColor = 'orange';
        } else {
            obj.backgroundColor = '#758BF4';
        }
        return obj;
    }
    goToListByFilter() {

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
                        onPress={this.goToListByFilter(item.type.name)}
                        underlayColor="#88D4F5">
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
