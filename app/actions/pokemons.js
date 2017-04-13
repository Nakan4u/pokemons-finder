import API from '../utils/api.js';

export function setCurrentPokemonName(name) {
  return {
    type: 'SET_CURRENT_POKEMON_NAME',
    name
  }
};

export function getPokemon(name) {
  return (dispatch, getState) => {
    return API.getInfo(name)
      .then((res) => {
        dispatch(setPokemon(res));
        dispatch(setCurrentPokemonName(res.name));
        return res;
      })
      .catch((error) => { console.error('erorr with getting pokemon data ', error) });
  }
}

export function setPokemon(data) {
  return {
    type: 'SET_POKEMON_DATA',
    data
  }
}

export function getPokemonsList() {
  return (dispatch, getState) => {
    return API.getList()
      .then((res) => {
        dispatch(setPokemonsList(res.results));
        return res.results;
      })
      .catch((error) => { console.error('erorr with getting pokemons list data ', error) });
  }
}

export function getPokemonsListBytype(type) {
  return (dispatch, getState) => {
    return API.getListBytype(type)
      .then((res) => {
        dispatch(setPokemonsList(res.pokemon));
        return res;
      })
      .catch((error) => { console.error('erorr with getting pokemons list by type data ', error) });
  }
}

export function setPokemonsList(data) {
  return {
    type: 'SET_POKEMONS_LIST',
    data
  }
}