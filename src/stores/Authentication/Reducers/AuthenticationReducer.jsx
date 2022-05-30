import { LOGIN_ACTION, LOGOUT_ACTION, RETRIEVE_TOKEN_ACTION } from "../Constants";

const INITIAL_STATE = {
    isLoading: true,
    userToken: undefined,
    userName: undefined
};

const AuthenticationReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case RETRIEVE_TOKEN_ACTION:
        return {
          ...state,
          userToken: action.token,
          isLoading: false,
        };
      case LOGIN_ACTION:
        return {
          ...state,
          userToken: action.token,
          userName: action.userName,
          isLoading: false,
        };
      case LOGOUT_ACTION:
        return {
          ...state,
          userToken: null,
          isLoading: false,
        };
      default: 
        return state;
    }
};

export default AuthenticationReducer;