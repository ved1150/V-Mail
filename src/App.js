import React, { useEffect, useState } from "react";
import AuthForm from "./Auth/AuthForm";
import Homepage from "./--PAGES--/Homepage";
import { useSelector, useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import ComposePage from "./--PAGES--/ComposePage";
import InboxMail from "./--PAGES--/InboxMail";
import OutBox from "./--PAGES--/OutBox";
import Showmsg from "./--PAGES--/Showmsg";
import { authActions } from "./Store/AuthReducer";
export default function App() {
  const login = useSelector((state) => state.auth.islogin);

  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    setIsLogin((pre) => JSON.parse(localStorage.getItem("isLogin")));
  }, [login]);
  return (
    <Router>
      <Switch>
        {!isLogin && (
          <Route path="/">
            <AuthForm />
          </Route>
        )}
        {isLogin && (
          <Route path="/inbox">
            <Homepage />
          </Route>
        )}
        <Route path="/send-box">
          <ComposePage />
        </Route>
        <Route path="/sent">
          <OutBox />
        </Route>
        <Route path="/inbox/mail">
          <InboxMail />
        </Route>
        <Route path="/showMsg">
          <Showmsg />
        </Route>
        {isLogin && (
          <Route exact path="/">
            <Redirect to="/inbox" />
          </Route>
        )}
      </Switch>
    </Router>
  );
}
