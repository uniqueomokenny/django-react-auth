import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'antd/dist/antd.css';
import './App.css';

import PrivateRoute from "./utils/PrivateRoute";

import Layout from "./components/layout/Layout";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import Dashboard from './components/dashboard';

import store from './redux/store';
import { logoutUser, setCurrentUser } from "./redux/actions/authActions";

import setAuthToken from "./utils/setAuthToken";

// check for token
if (localStorage.user) {
  const user = JSON.parse(localStorage.getItem("user"))

  // Set auth token header auth
  setAuthToken(user);
  // set user and isAuthenticated
  store.dispatch(setCurrentUser(user));

  // check for expired token
  const currentTime = Date.now() / 1000;
  if (user.expirationTime < currentTime) {
    // logout user
    store.dispatch(logoutUser());
    // Clear current Profile
    store.dispatch(setCurrentUser({}));
    // Redirect to login
    window.location.href = "/login";
  }
}

const AppRoute = ({ component: Component, layout: Layout, ...rest }) => (
  <Route { ...rest } render = { props => (
    <Layout>
      <Component {...props}/>
    </Layout>
  )}/>
)

function App() {
  return (
      <Provider store={store}>
        <Router>
          <Switch>
              <AppRoute exact path="/" layout={Layout} component={Register} />
              <AppRoute exact path="/login" layout={Layout} component={Login} />
              <PrivateRoute exact path="/dashboard" layout={Layout} component={Dashboard} />
          </Switch>
        </Router>
      </Provider>
  );
}

export default App;
