import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
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

import { ActionCreators } from '../../actions';
import API from '../../utils/api.js';
import Separator from '../../components/helpers/Separator';
import ListClass from '../../containers.v2/List';

import stylesGlobal from '../styles.general.css.js';
import stylesLocal from './List.css.js';

const styles = StyleSheet.create(stylesLocal);
const stylesGenerel = StyleSheet.create(stylesGlobal);

class List extends ListClass {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            dataSource: ds.cloneWithRows(this.props.pokemonsListData),
            isLoading: false,
        };
    }

    render() {
        var showErr = (
            this.state.error ? <Text style={stylesGenerel['.error']}> {this.state.error} </Text> : <View></View>
        ),
            title = this.props.match.params.type ? this.props.match.params.type + ' pokemons list :' : 'Pokemons list :';

        return (
            <View style={stylesGenerel['.container']}>
                <Text style={stylesGenerel['.title']}> {title} </Text>
                {showErr}
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(item, sectionID, rowID) => {
                        var pokemon = item.pokemon ? item.pokemon : item;
                        rowID++; //increase index to begin from 1;
                        
                        return <View key={rowID} style={styles['.rowContainer']}>
                            <TouchableHighlight
                                onPress={this.goToProfile.bind(this, pokemon.name)}
                                underlayColor="blue">
                                <Text style={styles['.rowTitle']}> {rowID}. {pokemon.name} </Text>
                            </TouchableHighlight>
                            <Separator></Separator>
                        </View>
                    }} />
                <ActivityIndicator animating={this.state.isLoading} size='large' />
            </View>
        );
    }
}

function mapStateToProps(state) {
  return {
    pokemonsListData: state.pokemonsListData
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(List));

AppRegistry.registerComponent('List', () => List);
