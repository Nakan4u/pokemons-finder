import API from '../utils/api.js';

export function addFavorite(pokemon) {
  return (dispatch, getState) => {
    return API.addFavoritePokeon(pokemon)
      .then((res) => {
        console.log('Pokemon added to favorites', res);
        return res;
      })
      .catch((err) => {
        console.log('problem whith adding to favorites', err);
        return err;
      })
  }
}

export function removeFavorite(id) {
  return (dispatch, getState) => {
    return API.removeFavoritePokeon(id)
      .then((res) => {
        console.log('Pokemon removed from favorites', res);
        return res;
      })
      .catch((err) => {
        console.log('problem whith removing pokemon from favorites', err);
        return err;
      })
  }
}
