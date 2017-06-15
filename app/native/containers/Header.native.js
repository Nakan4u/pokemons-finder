import React, { Component } from 'react';
import { Link } from 'react-router-native';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';

import stylesLocal from './Header.css.js';
const styles = StyleSheet.create(stylesLocal);

export default class Header extends React.Component {
    render () {
        return (
            <View style={styles['.header']}>
                <Link to="/">
                    <Text style={styles['.navItem']}>Go to Home</Text>
                </Link>
            </View>
        );
    }
}
