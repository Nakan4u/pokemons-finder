import { combineReducers } from 'redux'
import currentPokemon from './currentPokemon'

const pokeApp = combineReducers({
  currentPokemon
})

export default pokeApp
