import { StyleSheet } from 'react-native';

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
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
    button: {
        height: 50,
        flexDirection: 'row',
        backgroundColor: '#48BBEC',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        marginTop: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    }
});

module.exports = styles;