import React, { PropTypes, Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Link } from 'react-router';
import Header from './Header';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    }
});

export default class App extends React.Component {
    
    render() {
        console.log('children: ', this.props);
        return (
            <View style={styles.container}>
                <Header />
                {this.props.children}
            </View>
        );
    }
};

App.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
};
