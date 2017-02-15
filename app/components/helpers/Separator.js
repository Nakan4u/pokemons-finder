import React, { Component } from 'react';
import {
    StyleSheet,
    View
} from 'react-native';

const styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: '#E4E4E4',
    // flex: 1
  },
});

export default class Separator extends React.Component{
  render(){
    return (
      <View style={styles.separator} />
    );
  }
};