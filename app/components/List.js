import Dashboard from './Dashboard.js';
import Separator from './helpers/Separator.js';
import API from '../utils/api.js';
import React, { Component } from 'react';
import {
    AppRegistry,
    ActivityIndicator,
    Text,
    View,
    ScrollView,
    ListView,
    StyleSheet,
    TouchableHighlight
} from 'react-native';

export default class List extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            dataSource: ds.cloneWithRows(this.props.pokemonList),
            isLoading: false,
            error: false
        };
    }
    goToProfile(pokemonName) {
        this.setState({isLoading: true});
        API.getInfo(pokemonName)
            .then((res) => {
                if (res.detail === "Not found.") {
                    this.setState({
                        error: 'Pokemon not found',
                        isLoading: false
                    })
                } else {
                    console.log(res);
                    this.props.navigator.push({
                        title: res.name || "Pokemon name",
                        component: Dashboard,
                        passProps: { pokemon: res, isFavorite: this.props.title === 'Favorites list' }
                    });
                    this.setState({
                        isLoading: false,
                        error: false
                    })
                }
            })
            .catch((error) => { console.error(error) });
    }

    render() {
        var showErr = (
            this.state.error ? <Text style={styles.error}> {this.state.error} </Text> : <View></View>
        );
        var title = this.props.title;
        return (
            <View style={styles.container}>
                <Text style={styles.title}> {title} </Text>
                <ActivityIndicator
                    animating={this.state.isLoading}
                    color="#111"
                    size="large"></ActivityIndicator>
                {showErr}
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(item, sectionID, rowID) => {
                        rowID++; //increase index to begin from 1;
                        return <View key={rowID} style={styles.rowContainer}>
                            <TouchableHighlight
                                onPress={this.goToProfile.bind(this, item.pokemon.name)}
                                underlayColor="blue">
                                <Text style={styles.rowTitle}> {rowID}. {item.pokemon.name} </Text>
                            </TouchableHighlight>
                            <Separator></Separator>
                        </View>
                    }} />
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        marginTop: 45,
        padding: 25,
        flex: 1
    },
    title: {
        fontSize: 24,
        color: '#48BBEC',
        alignSelf: 'center',
        marginBottom: 15
    },
    listWrapper: {
        height: 400,
        padding: 10,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#48BBEC'
    },
    listInner: {
        flex: 1,
        // alignItems: 'flex-start',
        justifyContent: 'flex-start',
        padding: 10,
    },
    rowContainer: {
        // flexGrow: 1,
        // height: 20
    },
    rowTitle: {
        color: '#48BBEC',
        fontSize: 20,
        padding: 5
    },
    rowContent: {
    }
});

List.propTypes = {
    title: React.PropTypes.string.isRequired,
    pokemonList: React.PropTypes.array.isRequired
};

AppRegistry.registerComponent('List', () => List);
