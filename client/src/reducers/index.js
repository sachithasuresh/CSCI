import {combineReducers} from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";

//use combinedReducers from redux to combine authReducer & errorReducer into one rootReducer
export default combineReducers({
    auth: authReducer,
    errors: errorReducer
  });