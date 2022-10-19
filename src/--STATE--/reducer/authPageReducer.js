const auth = {
    showLoginPage: true,
    userLogin : false
  };
  
  const authPageReducer = (state = auth, action) => {
    if (action.type === "showSignupPage") {
      return {
          showLoginPage: !state.showLoginPage,
      };
    }
    if (action.type === "showLoginPage") {
      return {
          showLoginPage: !state.showLoginPage,
      };
    }
    return state
  };
  export default authPageReducer