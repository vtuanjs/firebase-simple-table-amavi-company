import { CREATE_RECORD_SUCCESS, CREATE_RECORD_ERROR } from '../dataTypes/recordType'
const initState = {}

const recordReducer = (state = initState, action) => {
  switch (action.type) {
    case CREATE_RECORD_SUCCESS:
      return state;
    case CREATE_RECORD_ERROR:
      return state;
    default:
      return state;
  }
};

export default recordReducer;