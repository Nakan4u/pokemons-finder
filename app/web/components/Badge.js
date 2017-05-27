import React from 'react';
import Badge from '../../components/Badge';

export default class BadgeWeb extends Badge {
    render() {
        var pokemon = this.props.pokemon;
        var list = pokemon.types.map((item, index) => {
            if (item.type.name) {
                return (
                    <a href="#" key={index}
                        style={{backgroundColor:super.makeBackground(item.type.name).backgroundColor}}
                        onClick={this.props.getPokemonsListByTypeHandler.bind(this, item.type)}>
                        <span className="type">{item.type.name}</span>
                    </a>
                )
            } else {
                return <span></span>
            }
        });
        return (
            <div className="badge container">
                <h3> {pokemon.name} </h3>
                <img src={pokemon.sprites.front_default} alt={pokemon.name}/>
                <p>Type to get pokemons list with same type:</p>
                <div className="typeWrapper">
                    {list}
                </div>
            </div>
        );
    }
}
