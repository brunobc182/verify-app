import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Verify } from "./pages/Verify";

function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Verify />
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Router>
  );
}

export default Routes;
