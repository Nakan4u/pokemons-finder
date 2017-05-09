import React, { Component } from 'react';
import { Link } from 'react-router-native';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';

const styles = StyleSheet.create({
  header: {
    height: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20
  },
  navItem: {
    flex: 1,
    fontSize: 14,
    color: '#48BBEC',
    alignItems: 'center',
    padding: 10,
  }
});

export default class Header extends React.Component{
  render(){
    return (
      <View style={styles.header}>
        <Link to="/">
            <Text style={styles.navItem}>Go to Home</Text>
        </Link>
      </View>
    );
  }
};