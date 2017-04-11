import { combineReducers } from 'redux'
import currentPokemonName from './currentPokemon'
import currentPokemonData from './currentPokemonData'
import pokemonsListData from './pokemonsList'

const pokeApp = combineReducers({
  currentPokemonName,
  currentPokemonData,
  pokemonsListData
})

export default pokeApp
