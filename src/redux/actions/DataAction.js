import {
  ADD_DATA_REQUEST,
  DELETE_DATA_REQUEST,
  GET_DATA_REQUEST,
  UPDATE_DATA_REQUEST,
  VIEW_DATA_REQUEST,
} from "../constants/DataConstants";

export const addData = (data) => {
  console.log("addaction", data);
  return {
    type: ADD_DATA_REQUEST,
    data,
  };
};

export const getData = () => {
  return {
    type: GET_DATA_REQUEST,
  };
};

export const deleteData = (id) => {
  return {
    type: DELETE_DATA_REQUEST,
    id,
  };
};

export const updateData = (id, data) => {
  console.log("updateData", id, data);
  return {
    type: UPDATE_DATA_REQUEST,
    id,
    data,
  };
};

export const viewData = (id) => {
  return {
    type: VIEW_DATA_REQUEST,
    id,
  };
};
