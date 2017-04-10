import { combineReducers } from 'redux'
import currentPokemonName from './currentPokemon'
import currentPokemonData from './currentPokemonData'
import appLoadingState from './appLoadingState'

const pokeApp = combineReducers({
  currentPokemonName,
  currentPokemonData,
  appLoadingState,
})

export default pokeApp
