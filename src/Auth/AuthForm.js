import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
export default function AuthForm() {
  // -------------------for input use useRef---------------------//
  const email = useRef();
  const password = useRef();
  const conPassword = useRef();
  // -------------------for triger and get redux state (useSelector ,useDispatch)---------------------//
  const globalStore = useSelector((state) => {
    return {
      isLogin: state.authPage.showLoginPage,
       tokenId : state.token.tokenId
    };
  });
  console.log(globalStore)
  const dispatch = useDispatch();
  function changeAuthPage() {
    dispatch({ type: "showSignupPage" });
  }
  function sendFormData(event) {
    event.preventDefault();
    const enteredEmail = email.current.value;
    const enteredPassword = password.current.value;
    // ----------------------------------Log-In(firbase)----------------------------------//
    if (globalStore.isLogin) {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBoRlualxztzphJyEheAtArD6hJ7SrPdSc",
        {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
        }
      ).then((res) => {
        if (res.ok) {
          dispatch({ type: "enter" });
          alert("you are log in ");
          res.json().then((data) => {
            globalStore.tokenId.push(data.idToken)
            localStorage.setItem('tokenId', JSON.stringify(data.idToken));

          });
        } else {
          res.json().then((data) => alert(data.error.message));
        }
      });
    }
    // ----------------------------------Sing-Up(firbase)----------------------------------//
    else {
      const enteredconPassword = conPassword.current.value;
      if (enteredPassword === enteredconPassword) {
        alert("password not match");
      }

      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBoRlualxztzphJyEheAtArD6hJ7SrPdSc",
        {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
        }
      ).then((res) => {
        if (res.ok) {
          console.log("User has successfully signed up.");
          alert("Sign-up successfully ");
          dispatch({ type: "enter" });
          res.json().then((data) => {
            globalStore.tokenId.push(data.idToken)
            localStorage.setItem('tokenId', JSON.stringify(data.idToken));
           });
        } else {
          res.json().then((data) => alert(data.error.message));
        }
      });
    }
  }
  return (
    <div>
      <form>
        <h1>{globalStore.isLogin ? "Login" : "signUp"}</h1>
        <input type="text" placeholder="Email" required ref={email} />
        <input type="password" placeholder="Password" required ref={password} />
        {!globalStore.isLogin && (
          <input
            type="password"
            placeholder="confirm Password"
            required
            ref={conPassword}
          />
        )}
        <button onClick={sendFormData}>
          {globalStore.isLogin ? "Login" : "Sign-Up"}
        </button>
        {globalStore.isLogin && <Link to="/forgot">forgot ?</Link>}
        <button onClick={() => changeAuthPage()}>
          {globalStore.isLogin
            ? "create new account? sign-up now "
            : "Already have account ! login now "}
        </button>
      </form>
    </div>
  );
}
