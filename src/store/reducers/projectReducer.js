import {
  CREATE_PROJECT_SUCCESS,
  CREATE_PROJECT_ERROR,
  DELETE_PROJECT_REQUEST,
  DELETE_PROJECT_SUCCESS,
  DELETE_PROJECT_ERROR,
  UPDATE_PROJECT_SUCCESS,
  UPDATE_PROJECT_ERROR
} from "../dataTypes/projectType";
const initState = {};

const projectReducer = (state = initState, action) => {
  switch (action.type) {
    case CREATE_PROJECT_SUCCESS:
      return state;
    case CREATE_PROJECT_ERROR:
      return state;
    case DELETE_PROJECT_REQUEST:
      return state;
    case DELETE_PROJECT_SUCCESS:
      return state;
    case DELETE_PROJECT_ERROR:
      return state;
    case UPDATE_PROJECT_ERROR:
      return state;
    case UPDATE_PROJECT_SUCCESS:
      return state;
    default:
      return state;
  }
};

export default projectReducer;
