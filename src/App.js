import React from "react";
import AuthForm from "./Auth/AuthForm";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
export default function App() {
  return (
    <Router>
      <Switch>
        <Route>
          <AuthForm />
        </Route>
      </Switch>
    </Router>
  );
}
