import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Verify } from "./pages/Verify";
import { Report } from "./pages/Report";

function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Verify />
        </Route>
        <Route exact path="/report">
          <Report />
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Router>
  );
}

export default Routes;
