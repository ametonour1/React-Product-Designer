import { combineReducers } from "redux";
import authReducer from "./authReducer"
import testReducer from "./testRedcer";

const rootReducer = combineReducers({
    auth:authReducer,
    test:testReducer
})

export default rootReducer;