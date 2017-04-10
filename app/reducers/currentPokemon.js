const currentPokemonName = (state = 'pikachu', action) => {
  switch (action.type) {
    case 'SET_CURRENT_POKEMON_NAME':
      return action.name
    default:
      return state
  }
}

export default currentPokemonName
