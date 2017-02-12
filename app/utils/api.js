const firebaseUrl = 'https://pokemons-picker.firebaseio.com/favorite_pokemons.json',
    apiBaseUrl = 'https://pokeapi.co/api/v2';

var api = {
    getInfo(pokemonName) {
        pokemonName = pokemonName.toLowerCase().trim();
        var url = `${apiBaseUrl}/pokemon/${pokemonName}`;
        return fetch(url).then((res) => res.json())
    },
    getListBytype(url) {
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
    },
    removeFavoritePokeon(id) {
        return fetch(`https://pokemons-picker.firebaseio.com/favorite_pokemons/${id}.json`, {
            method: 'delete'
        }).then((res) => res.json());
    }
};

module.exports = api;