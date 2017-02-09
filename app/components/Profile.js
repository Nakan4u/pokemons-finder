import styles from '../general.styles.js';
import Badge from './Badge.js';
import Separator from './helpers/Separator.js';
import React, { Component } from 'react';
import {
    AppRegistry,
    Text,
    View,
    ScrollView
} from 'react-native';

export default class Profile extends Component {
    render() {
        var getRowTitle = (item) => item[0] ? item[0].toUpperCase() + item.slice(1) : item;
        var pokemon = this.props.pokemon;
        var topicArr = ['id', 'order', 'base_experience', 'height', 'weight'];
        var list = topicArr.map((item, index) => {
            if (!pokemon[item]) {
                return <View key={index} />
            } else {
                return (
                    <View key={index}>
                        <View style={styles.rowContainer}>
                            <Text style={styles.rowTitle}> {getRowTitle(item)} </Text>
                            <Text style={styles.rowContent}> {pokemon[item]} </Text>
                            <Separator></Separator>
                        </View>
                    </View>
                )
            }
        });
        return (
            <View style={styles.container}>
                <Text style={styles.title}> Pokemon profile: </Text>
                <Badge pokemon={pokemon}></Badge>
                <ScrollView>
                    {list}
                </ScrollView>
            </View>
        );
    }
}
Profile.propTypes = {
    pokemon: React.PropTypes.object.isRequired
};

AppRegistry.registerComponent('Profile', () => Profile);
