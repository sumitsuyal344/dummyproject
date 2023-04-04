import { combineReducers } from "redux";

import category from "./data.reducer";

const rootReducer = combineReducers({
  addReducer: category,
});

export default rootReducer;
