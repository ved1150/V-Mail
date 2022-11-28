import {configureStore} from "@reduxjs/toolkit"
import AuthReducer from "./AuthReducer"
import ComposeReducer from "./ComposeReducer"
import InboxReducer from "./InboxReducer"
import OpenMailReducer from "./OpenMailReducer"
const store = configureStore({
    reducer :{
        auth : AuthReducer,
        compose : ComposeReducer,
        inbox : InboxReducer ,
        openMail : OpenMailReducer
    }
})

export default store
