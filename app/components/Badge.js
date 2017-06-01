import React, { Component } from 'react';


export default class Badge extends Component {
    makeBackground(type) {
        var obj = {}
        
        switch (type) {
            case 'normal':
                obj.backgroundColor = 'aliceblue';
                break;
            case 'fighting':
                obj.backgroundColor = 'bisque';
                break;
            case 'flying':
                obj.backgroundColor = 'brown';
                break;
            case 'poison':
                obj.backgroundColor = 'chartreuse';
                break;
            case 'ground':
                obj.backgroundColor = 'darkgoldenrod';
                break;
            case 'rock':
                obj.backgroundColor = 'darkgrey';
                break;
            case 'bug':
                obj.backgroundColor = 'darkmagenta';
                break;
            case 'ghost':
                obj.backgroundColor = 'darkseagreen';
                break;
            case 'steel':
                obj.backgroundColor = 'dimgray';
                break;
            case 'fire':
                obj.backgroundColor = 'gold';
                break;
            case 'water':
                obj.backgroundColor = 'deepskyblue';
                break;
            case 'grass':
                obj.backgroundColor = 'forestgreen';
                break;
            case 'electric':
                obj.backgroundColor = 'khaki';
                break;
            case 'psychic':
                obj.backgroundColor = 'lavender';
                break;
            case 'ice':
                obj.backgroundColor = 'lightblue';
                break;
            case 'dragon':
                obj.backgroundColor = 'lightgreen';
                break;
            case 'dark':
                obj.backgroundColor = 'indigo';
                break;
            case 'fairy':
                obj.backgroundColor = 'lightpink';
                break;
            case 'unknown':
                obj.backgroundColor = 'silver';
                break;
            case 'shadow':
                obj.backgroundColor = 'black';
                break;
            default:
                obj.backgroundColor = 'grey';
        }
        return obj;
    }
}

Badge.propTypes = {
    pokemon: React.PropTypes.object.isRequired,
    getPokemonsListByTypeHandler: React.PropTypes.func.isRequired
};
