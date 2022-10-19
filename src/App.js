import React from "react";
import AuthForm from "./Auth/AuthForm";
import Homepage from "./--PAGES--/Homepage";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
export default function App() {
  const globalStore = useSelector((state) => {
    return {
      isLogin: state.authPage.showLoginPage,
      enter: state.authPage.userLogin,
    };
  });
 
  return (
    <Router>
      <Switch>
        {!globalStore.enter && (
          <Route>
            <AuthForm />
          </Route>
        )}
        {globalStore.enter && (
          <Route>
            <Homepage />
          </Route>
        )}
      </Switch>
    </Router>
  );
}
