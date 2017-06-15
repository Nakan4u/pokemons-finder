const currentPokemonData = (state = {}, action) => {
    switch (action.type) {
        case 'SET_POKEMON_DATA':
            return action.data;
        default:
            return state;
    }
};

export default currentPokemonData;
