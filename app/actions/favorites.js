import API from '../utils/api.js';

export function addFavorite (pokemon) {
    return (dispatch, getState) => API.addFavoritePokeon(pokemon)
      .then(res => {
          console.log('Pokemon added to favorites ', res);
          return res;
      })
      .catch(err => {
          console.log('problem whith adding to favorites ', err);
          return err;
      });
}

export function removeFavorite (id) {
    return (dispatch, getState) => API.removeFavoritePokeon(id)
      .then(res => {
          console.log('Pokemon removed from favorites ', res);
          return res;
      })
      .catch(err => {
          console.log('problem whith removing pokemon from favorites ', err);
          return err;
      });
}

export function getFavoritePokemons () {
    return (dispatch, getState) => API.getFavoritePokemons()
      .then(res => {
          console.log('favorites ', res);
          return res;
      })
      .catch(err => {
          console.log('problem whith getting favorites list ', err);
          return err;
      });
}
