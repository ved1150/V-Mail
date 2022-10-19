const auth = {
    showLoginPage: true,
    userLogin : false ,
  };
  
  const authPageReducer = (state = auth, action) => {
    if (action.type === "showSignupPage") {
      return {
          showLoginPage: !state.showLoginPage,
      };
    }
   
    if (action.type === "enter") {
      return {
        userLogin: true,
      };
    }
    return state
  };
  export default authPageReducer