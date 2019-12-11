import {combineReducers} from "redux";
import settingsReducer from "./settings";
import queriesReducer from "./queries";

export default combineReducers({
  settings: settingsReducer,
  queries: queriesReducer
});