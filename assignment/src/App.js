import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PrivateRoute from "./privateRoute";

import LoginPage from "./components/loginPage";
import DashboardPage from "./components/dashboardPage";

const App = () => (
  <BrowserRouter>
    <div>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route path="/login/" component={LoginPage} />
        <PrivateRoute path="/dashboard/" component={DashboardPage} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default App;
