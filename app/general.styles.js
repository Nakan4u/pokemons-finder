import { StyleSheet } from 'react-native';

var styles = StyleSheet.create({
    container: {
        marginTop: 45,
        padding: 25,
        flex: 1
    },
    title: {
        fontSize: 18,
        color: '#111',
        alignSelf: 'center',
        marginBottom: 15
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
    button: {
        height: 25,
        flexDirection: 'row',
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        marginTop: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    rowContainer: {
        padding: 10,
        paddingLeft: 15
    },
    rowTitle: {
        color: '#48BBEC',
        fontSize: 16
    },
    rowContent: {
        fontSize: 19
    }
});

module.exports = styles;