import { combineReducers } from "redux";
import authPageReducer from "./authPageReducer";
import tokenReducer from "./tokenReducer";
const reducers = combineReducers({
    authPage : authPageReducer,
    token : tokenReducer
})
export default reducers