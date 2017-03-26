import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import Root from './components/Root'
import todoApp from './reducers'

const store = createStore(
  todoApp
);

render(
  <Root store={store} />,
  document.getElementById('root')
)
