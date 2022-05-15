import { LOGIN_ACTION, LOGOUT_ACTION } from "../Constants";

export const signIn= (userName, userToken) => {    
    return {
        type: LOGIN_ACTION, 
        id: userName,
        token: userToken
    };
}

export const signOut= () => {
    return {
      type: LOGOUT_ACTION
    }
}