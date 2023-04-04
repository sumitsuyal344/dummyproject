import { call, put, takeLatest } from "redux-saga/effects";
import {
  LOGIN_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_ERROR,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from "../constants/UserConstants";
import "firebase/auth";
import firebase from "../../firebase";

// function getUser(id) {
//   return firebase
//     .firestore()
//     .collection("users")
//     .doc()
//     .get()
//     .then((response) => response);
// }

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
  const { email, password, navigate } = data;
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
      // const list = yield call(getUser, uid);
      // const currentUserList = list.data();
      // console.log("Currentuser", currentUserList);
      // if (currentUserList === undefined) {
      //   const err = "You are not authorized to access this website";
      //   yield put({ type: LOGIN_ERROR, err });
      // } else {
      //   localStorage.setItem("currentUserRole", currentUserList.role);
      //   let currentDate = new Date();
      //   localStorage.setItem("loginTime", currentDate);
      //   // let obj = {};
      //   // obj["inviteStatus"] = "Accepted";
      //   // yield call(updateUser, obj, uid);
      //   yield put({ type: LOGIN_SUCCESS });
      //   // <Navigate to="/hello" replace={true} />;
      //     navigate("/Home");
      // }
      // console.log("list1", list);
      // console.log("Currentuser1", currentUserList);
      yield put({ type: LOGIN_SUCCESS,  });
      // <Navigate to="/hello" replace={true} />;
       navigate("/Home");
    } else {
      const err = "Invalid Password or username";
      yield put({ type: LOGIN_ERROR, err });
    }
  } catch (error) {
    const err = error.message;
    yield put({ type: LOGIN_ERROR, err });
  }
}
function* registerUser(data) {
  const {username, email, password, navigate } = data;
  // console.log("datalogin", email, password, navigate);
  // console.log("naviagte",navigate)
  // console.log("obj::", obj.obj);
  // const { username, email, password } = obj.obj;
  // console.log("registerUser", username, email, password,navigate);
  try {
    const auth = firebase.auth();
    const value = yield call(
      [auth, auth.createUserWithEmailAndPassword],
      email,
      password,
      username
    );
    const token = value.user.refreshToken;
    const uid = value.user.uid;
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
    localStorage.setItem("uid", uid);
    console.log("userId", uid);
    if (token) {
      // const list = yield call(getUser, uid);
      // const currentUserList = list.data();
      // console.log("Currentuser", currentUserList);

      yield put({ type: REGISTER_SUCCESS, token });
      // <Navigate to="/hello" replace={true} />;
      navigate("/");
    } else {
      const err = "Invalid Password or username";
      yield put({ type: REGISTER_ERROR, err });
    }
  } catch (error) {
    const err = error.message;
    yield put({ type: REGISTER_ERROR, err });
  }
}

// function* logOutUser(data) {
//   const {email, navigate } = data;
//   // console.log("datalogin", email, password, navigate);
//   // console.log("naviagte",navigate)
//   // console.log("obj::", obj.obj);
//   // const { username, email, password } = obj.obj;
//   // console.log("registerUser", username, email, password,navigate);
//   try {
//     localStorage.removeItem("token");
//   localStorage.removeItem("currentUserRole");
//       yield put({ type:LOGOUT_SUCCESS,  });
//       // <Navigate to="/hello" replace={true} />;
//       navigate("/");
//   } catch (error) {
//     const err = error.message;
//     yield put({ type: LOGOUT_SUCCESS, err });
//   }
// }



//  eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  function* watcher() {
    yield takeLatest(LOGIN_REQUEST, loginUser);
    yield takeLatest(REGISTER_REQUEST, registerUser);
    // yield takeLatest(LOGOUT_REQUEST, logOutUser);
  }
  return { watcher };
};
