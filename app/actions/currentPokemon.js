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
        console.log('respone from action', res);
        dispatch(setPokemon(res));
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