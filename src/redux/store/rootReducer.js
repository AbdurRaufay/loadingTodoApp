import { combineReducers } from "redux";
import todoReducers from "../reducres/todoReducers";

const rootReducer = combineReducers({
  todoReducers,
});
export default rootReducer;
