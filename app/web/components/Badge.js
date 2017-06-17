import React from 'react';
import Badge from '../../components/Badge';

import { styles } from '../../native/components/Badge.css.js';
require('./Badge.css');

export default class BadgeWeb extends Badge {
    render () {
        const {pokemon, getPokemonsListByTypeHandler} = this.props;

        var list = pokemon.types.map((item, index) => {
            if (item.type.name)
                return (
                    <a href="#" key={index} className="typeInner"
                        style={{backgroundColor:super.makeBackground(item.type.name).backgroundColor}}
                        onClick={getPokemonsListByTypeHandler.bind(this, item.type)}>
                        <span className="type">{item.type.name}</span>
                    </a>
                );

            return <span></span>;
        });

        return (
            <div className="badge badgeContainer">
                <h3 className="title"> {pokemon.name} </h3>
                <img src={pokemon.sprites.front_default} alt={pokemon.name} className="image"/>
                <p className="info">Type to get pokemons list with same type:</p>
                <div className="typeWrapper">
                    {list}
                </div>
            </div>
        );
    }
}
