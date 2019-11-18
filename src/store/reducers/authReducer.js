import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SIGNOUT_SUCCESS,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR
} from "../dataTypes/authType";

const initState = {
  authError: null
}

const authReducer = (state = initState, action) => {
  switch(action.type){
    case LOGIN_ERROR:
      return {
        ...state,
        authError: 'Login failed'
      }

    case LOGIN_SUCCESS:
      return {
        ...state,
        authError: null
      }

    case SIGNOUT_SUCCESS:
      return state;

    case SIGNUP_SUCCESS:
      return {
        ...state,
        authError: null
      }

    case SIGNUP_ERROR:
      return {
        ...state,
        authError: action.err.message
      }

    default:
      return state
  }
};

export default authReducer;