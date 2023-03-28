import {
  ADD_DATA_ERROR,
  ADD_DATA_REQUEST,
  ADD_DATA_SUCCESS,
  GET_DATA_ERROR,
  GET_DATA_REQUEST,
  GET_DATA_SUCCESS,
  VIEW_DATA_ERROR,
  VIEW_DATA_REQUEST,
  VIEW_DATA_SUCCESS,
} from "../constants/DataConstants";

const initialState = {
  dataList: [],
  error: "",
  loading: false,
  viewSingleData: [],
};

const category = (state = initialState, action) => {
  switch (action.type) {
    case ADD_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case ADD_DATA_ERROR:
      return {
        loading: false,
        error: action.err,
      };
    case GET_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_DATA_SUCCESS:
      // console.log("reducer", action.list);
      return {
        ...state,
        loading: false,
        dataList: action.list,
        // count: action.count,
      };
    case GET_DATA_ERROR:
      return {
        loading: false,
        error: action.err,
      };
    case VIEW_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case VIEW_DATA_SUCCESS:
      console.log("reducer view", action.singleValue);
      return {
        ...state,
        loading: false,
        viewSingleData: action.singleValue,
        // count: action.count,
      };
    case VIEW_DATA_ERROR:
      return {
        loading: false,
        error: action.err,
      };
    default:
      return state;
  }
};

export default category;
