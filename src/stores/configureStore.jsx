import { combineReducers, createStore } from "redux";
import AuthenticationReducer from "./Authentication/Reducers/AuthenticationReducer";

const rootReducer = combineReducers({
    authentication: AuthenticationReducer
})

const configureStore = () => {
    return createStore(rootReducer);
}

export default configureStore; 