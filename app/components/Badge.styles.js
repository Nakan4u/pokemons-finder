import { StyleSheet } from 'react-native';

var styles = StyleSheet.create({
    container: {
        marginTop: 15,
        flex: 1
    },
    image: {
        height: 200,
        width: 200,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#48BBEC',
        alignSelf: 'center'
    },
    title: {
        fontSize: 24,
        color: '#48BBEC',
        alignSelf: 'center',
        marginBottom: 15
    },
    info: {
        fontSize: 12,
        color: '#48BBEC',
        alignSelf: 'center',
    },
    type: {
        fontSize: 14,
        lineHeight: 14,
        color: '#fff',
        alignSelf: 'center',
    },
    typeWrapper: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
    }
});

module.exports = styles;