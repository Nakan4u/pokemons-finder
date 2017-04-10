const appLoadingState = (state = false, action) => {
  switch (action.type) {
    case 'SET_LOADING_STATE':
      return action.flag
    default:
      return state
  }
}

export default appLoadingState
