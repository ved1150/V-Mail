import { combineReducers } from "redux";
import authPageReducer from "./authPageReducer";

const reducers = combineReducers({
    authPage : authPageReducer
})
export default reducers