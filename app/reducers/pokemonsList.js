const currentPokemonData = (state = [], action) => {
  switch (action.type) {
    case 'SET_POKEMONS_LIST':
      return action.data
    default:
      return state
  }
}

export default currentPokemonData