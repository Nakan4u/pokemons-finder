const currentPokemon = (state = 'pikachu2', action) => {
  switch (action.type) {
    case 'SET_CURRENT_POKEMON':
      return action.pokemon
    default:
      return state
  }
}

export default currentPokemon
