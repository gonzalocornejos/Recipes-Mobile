import { combineReducers, createStore } from "redux";
import AuthenticationReducer from "./Authentication/Reducers/AuthenticationReducer";
import RecipeReducer from "./CreateRecipe/Reducers/RecipeReducer";

const rootReducer = combineReducers({
    authentication: AuthenticationReducer,
    recipe: RecipeReducer
})

const configureStore = () => {
    return createStore(rootReducer);
}

export default configureStore; 