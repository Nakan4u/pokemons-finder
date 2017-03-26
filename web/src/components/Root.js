import React from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import App from './App';
import Login from '../containers/LoginForm';

const browserHistory = createBrowserHistory();

const Root = ({ store }) => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/login">login</Link></li>
        </ul>
        <hr />
        <Route exact path="/" component={App} />
        <Route path="/login" component={Login} />
      </div>
    </Router>
  </Provider>
)

export default Root
