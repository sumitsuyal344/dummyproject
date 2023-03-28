import { call, put, takeLatest } from "redux-saga/effects";
import {
  LOGIN_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
} from "../constants/UserConstants";
import "firebase/auth";
import firebase from "../../firebase";
import { db } from "../../firebase";
import { Navigate } from "react-router-dom";

function getUser(id) {
  return firebase
    .firestore()
    .collection("users")
    .doc(id)
    .get()
    .then((response) => response);
}

// function updateUser(data, id) {
//   console.log("userId", id);
//   return firebase
//     .firestore()
//     .collection("users")
//     .doc(id)
//     .set(data, { merge: true })
//     .then((response) => response);
// }

function* loginUser(data) {
  const { email, password,navigate } = data;
  console.log("datalogin", email, password, navigate);
  try {
    console.log("datalogin", data);
    const auth = firebase.auth();
    const value = yield call(
      [auth, auth.signInWithEmailAndPassword],
      email,
      password
    );
    const token = value.user.refreshToken;
    const uid = value.user.uid;
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
    localStorage.setItem("uid", uid);
    console.log("userId", uid);
    if (token) {
      const list = yield call(getUser, uid);
      const currentUserList = list.data();
      console.log("Currentuser", currentUserList);
      if (currentUserList === undefined) {
        const err = "You are not authorized to access this website";
        yield put({ type: LOGIN_ERROR, err });
      } else {
        localStorage.setItem("currentUserRole", currentUserList.role);
        let currentDate = new Date();
        localStorage.setItem("loginTime", currentDate);
        // let obj = {};
        // obj["inviteStatus"] = "Accepted";
        // yield call(updateUser, obj, uid);
        yield put({ type: LOGIN_SUCCESS });
        // <Navigate to="/hello" replace={true} />;
         navigate("/hello");
      }
      console.log("list1", list);
      console.log("Currentuser1", currentUserList);
      yield put({ type: LOGIN_SUCCESS, currentUserList });
      // <Navigate to="/hello" replace={true} />;
      navigate("/hello");
    } else {
      const err = "Invalid Password or username";
      yield put({ type: LOGIN_ERROR, err });
    }
  } catch (error) {
    const err = error.message;
    yield put({ type: LOGIN_ERROR, err });
  }
}

export default () => {
  function* watcher() {
    yield takeLatest(LOGIN_REQUEST, loginUser);
  }
  return { watcher };
};
