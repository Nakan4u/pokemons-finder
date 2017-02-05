const firebaseUrl = 'https://pokemons-picker.firebaseio.com/favorite_pokemons.json';

var api = {
    getInfo(pokemonName) {
        pokemonName = pokemonName.toLowerCase().trim();
        var url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
        return fetch(url).then((res) => res.json())
    },
    getFavoritePokemons() {
        return fetch(firebaseUrl).then((res) => res.json())
    },
    addFavoritePokeon(data) {
        return fetch(firebaseUrl, {
            method: 'post',
            body: JSON.stringify(data)
        }).then((res) => res.json());
    }
};

module.exports = api;