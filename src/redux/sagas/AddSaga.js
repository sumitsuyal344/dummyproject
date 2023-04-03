import { call, put, takeLatest } from "redux-saga/effects";
import {
  ADD_DATA_ERROR,
  ADD_DATA_REQUEST,
  ADD_DATA_SUCCESS,
  DELETE_DATA_ERROR,
  DELETE_DATA_REQUEST,
  DELETE_DATA_SUCCESS,
  GET_DATA_ERROR,
  GET_DATA_REQUEST,
  GET_DATA_SUCCESS,
  UPDATE_DATA_ERROR,
  UPDATE_DATA_REQUEST,
  UPDATE_DATA_SUCCESS,
  VIEW_DATA_ERROR,
  VIEW_DATA_REQUEST,
  VIEW_DATA_SUCCESS,
} from "../constants/DataConstants";
import firebase from "../../firebase";
import { db } from "../../firebase";
import { doc, deleteDoc } from "firebase/firestore";
// import { updateData } from "../actions/DataAction";
// import { deleteData } from "../actions/DataAction";

function setValue(data, obj) {
  console.log("setValue", data, obj);
  const { name, address } = data;
  if (name !== "" && address !== "") {
    obj["name"] = name;
    obj["address"] = address;
    return obj;
  }
}

function addDatas(data) {
  return firebase
    .firestore()
    .collection("users")
    .add(data)
    .then((response) => response);
}

function* addData(values) {
  try {
    const { data } = values;
    let obj = {};
    setValue(data, obj);
    console.log("data:saga", data);
    yield call(addDatas, obj);
    yield put({ type: ADD_DATA_SUCCESS });
    window.location.reload();
    yield call(getData);
  } catch (error) {
    const err = error.message;
    yield put({ type: ADD_DATA_ERROR, err });
  }
}

async function getList() {
  let array = [];
  let list = db.collection("users");
  await list.get().then((snapshot) => {
    if (snapshot.empty) {
      return;
    }
    snapshot.forEach((doc) => {
      array.push({ ...doc.data(), id: doc.id });
    });
  });
  return array;
}

function* getData() {
  try {
    // const { deleteKey } = values;
    const list = yield call(getList);
    console.log("saga Data:", list);
    yield put({ type: GET_DATA_SUCCESS, list });
  } catch (error) {
    const err = error.message;
    yield put({ type: GET_DATA_ERROR, err });
  }
}

async function deleteValue(id) {
  return await deleteDoc(doc(db, "users", id.id));
}

function* deleteData(id) {
  console.log("sagaId", id);
  try {
    yield call(deleteValue, id);
    console.log(id);
    yield put({ type: DELETE_DATA_SUCCESS, id });
    yield call(getData);
  } catch (error) {
    console.log(error);
    const err = error.message;
    yield put({ type: DELETE_DATA_ERROR, err });
  }
}

function viewSingledata(id) {
  return firebase
    .firestore()
    .collection("users")
    .doc(id)
    .get()
    .then((response) => response);
}

function* viewData(id) {
  console.log("sagaId", id);
  try {
    const singleData = yield call(viewSingledata, id.id);
    const singleValue = singleData.data();
    yield put({ type: VIEW_DATA_SUCCESS, singleValue });
  } catch (error) {
    const err = error.message;
    yield put({ type: VIEW_DATA_ERROR, err });
  }
}

function updateDb(obj) {
  console.log("sagaIdUpdate",  obj);
  let {name,address,id}=obj.obj;
  let data={
    name:name,
    address:address
  }
  console.log("updateid",id,data)
  return firebase
    .firestore()
    .collection("users")
    .doc(id)
    .update(data)
    .then((response) => response);
}

function* updateData(obj) {
  console.log("sagaId", obj);
  try {
    // let obj = {};
    // setValue(id.data, obj);
    // console.log("SETVLAUE", obj);
     yield call(updateDb,  obj);
    // window.location.reload();
     yield call(getData);
     yield put({ type: UPDATE_DATA_SUCCESS });
  } catch (error) {
    const err = error.message;
    yield put({ type: UPDATE_DATA_ERROR, err });
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  function* watcher() {
    yield takeLatest(ADD_DATA_REQUEST, addData);
    yield takeLatest(GET_DATA_REQUEST, getData);
    yield takeLatest(DELETE_DATA_REQUEST, deleteData);
    yield takeLatest(VIEW_DATA_REQUEST, viewData);
    yield takeLatest(UPDATE_DATA_REQUEST, updateData);
  }
  return { watcher };
};
