import {
  CREATE_RECORD_SUCCESS,
  CREATE_RECORD_ERROR,
  DELETE_RECORD_SUCCESS,
  DELETE_RECORD_ERROR,
  UPDATE_RECORD_SUCCESS,
  UPDATE_RECORD_ERROR
} from "../dataTypes/recordType";
const initState = {};

const recordReducer = (state = initState, action) => {
  switch (action.type) {
    case CREATE_RECORD_SUCCESS:
      return state;
    case CREATE_RECORD_ERROR:
      return state;
    case DELETE_RECORD_SUCCESS:
      return state;
    case DELETE_RECORD_ERROR:
      return state;
    case UPDATE_RECORD_SUCCESS:
      return state;
    case UPDATE_RECORD_ERROR:
      return state;
    default:
      return state;
  }
};

export default recordReducer;
