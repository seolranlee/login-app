import React from "react";
import { BrowserRouter, Switch, NavLink } from "react-router-dom";

import PublicRoute from "./Utils/PublicRoute";
import PrivateRoute from "./Utils/PrivateRoute";

import LoginContainer from "./containers/LoginContainer";
import DashboardContainer from "./containers/DashboardContainer";
// import Home from './Home';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <div className="header">
            <NavLink exact activeClassName="active" to="/">
              Login
            </NavLink>
            <small>(Access without token only)</small>
            <NavLink activeClassName="active" to="/dashboard">
              Dashboard
            </NavLink>
            <small>(Access with token only)</small>
          </div>
          <div className="content">
            <Switch>
              <PublicRoute exact path="/" component={LoginContainer} />
              <PrivateRoute path="/dashboard" component={DashboardContainer} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
