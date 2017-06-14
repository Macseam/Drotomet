import { combineReducers } from "redux";
import { routerReducer as routing } from "react-router-redux";
import authState from './sampleReducer';

// Reducers list
const rootReducer = combineReducers({
  routing,
  authState
});

export default rootReducer;
