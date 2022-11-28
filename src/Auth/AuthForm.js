import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { authActions } from "../Store/AuthReducer";
import { composeActions } from "../Store/ComposeReducer";
export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const email = useRef();
  const password = useRef();
  const conPassword = useRef();
  const passwordEmail = useRef();
  let dispatch = useDispatch();
  const forgotPassword = useSelector((state) => state.auth.forgotPassword);
  const x = useSelector((state) => state);
  console.log(x);

  function changeLoginState() {
    setIsLogin((pre) => !pre);
  }
  function formHandler(event) {
    event.preventDefault();

    let emailEntered = email.current.value;
    let passwordEntered = password.current.value;

    if (isLogin) {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC1Vr94fVHuelrVU6rME2nh0CZCazXFuSQ",
        {
          method: "POST",
          body: JSON.stringify({
            email: emailEntered,
            password: passwordEntered,
            returnSecureToken: true,
          }),
        }
      ).then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            localStorage.setItem('token', JSON.stringify(data.idToken));
            localStorage.setItem('isLogin', JSON.stringify(true));
            localStorage.setItem('userEmail', JSON.stringify(data.email));
            let token =  JSON.parse(localStorage.getItem("token"));
            let userEmail =  JSON.parse(localStorage.getItem("userEmail"));
            dispatch(authActions.login(token));
            dispatch(authActions.setLoginEmail(userEmail));
          });
        } else {
          res.json().then((data) => {
            console.log(data);
            alert(data.error.message)
          });
        }
      });
    } else {
      let conPasswordEntered = conPassword.current.value;
      if (passwordEntered !== conPasswordEntered) {
        alert("Password not match");
      } else {
        fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC1Vr94fVHuelrVU6rME2nh0CZCazXFuSQ",
          {
            method: "POST",
            body: JSON.stringify({
              email: emailEntered,
              password: passwordEntered,
              returnSecureToken: true,
            }),
          }
        ).then((res) => {
          if (res.ok) {
            console.log("User has successfully signed up.");
            alert("Sign-up successfully ");
          } else {
            res.json().then((data) => alert(data.error.message));
          }
        });
      }
    }
  }
  function sendLinkForPasswordUpdate() {
    let passwordEmailEntered = passwordEmail.current.value;

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyC1Vr94fVHuelrVU6rME2nh0CZCazXFuSQ",
      {
        method: "POST",
        body: JSON.stringify({
          email: passwordEmailEntered,
          requestType: "PASSWORD_RESET",
        }),
      }
    ).then((res) => {
      if (res.ok) {
        alert("Change password link send check your mail box");
      } else {
        res.json().then((data) => alert(data.error.message));
      }
    });
  }
  return (
    <div className="authForm">
      {!forgotPassword && (
        <form onSubmit={formHandler}>
          <div className="authForm">
            <h1> {isLogin ? "Login" : "Sign-up"}</h1>
            <input type="text" placeholder="Email" required ref={email} />
            <input
              type="password"
              placeholder="Password"
              required
              ref={password}
            />
            {!isLogin && (
              <input
                type="password"
                placeholder="confirm Password"
                required
                ref={conPassword}
              />
            )}
            <button>{isLogin ? "Login" : "Sign-up"}</button>
            {isLogin && (
              <Link
                className="link"
                to="/forgotpassword"
                onClick={() => dispatch(authActions.forgot())}
              >
                forgot password
              </Link>
            )}
            <Link onClick={changeLoginState} className="link">
              {isLogin
                ? "Want to creat a new account !"
                : "have a account ? login"}
            </Link>
          </div>
        </form>
      )}
      {forgotPassword && (
        <div className="forgotPassword">
          <form>
            <label>Enter the email with which you have registered :</label>
            <br />
            <input type="text" ref={passwordEmail} placeholder="abc@gmail.com" />
          </form>
          <button onClick={sendLinkForPasswordUpdate}>send link</button>
          <button onClick={() => dispatch(authActions.forgot())}>back</button>
        </div>
      )}
    </div>
  );
}
