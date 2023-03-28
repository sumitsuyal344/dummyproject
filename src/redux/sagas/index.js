import { fork } from "redux-saga/effects";
import AddSaga from "./AddSaga";
import UserSaga from "./UserSaga";

export default function* sagas() {
  yield fork(AddSaga().watcher);
  yield fork(UserSaga().watcher);
}
