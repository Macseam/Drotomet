import { combineReducers } from "redux";
import { routerReducer as routing } from "react-router-redux";
import headerState from './headerReducer';
import authState from './authReducer';

// main reducers
const rootReducer = combineReducers({
  routing,
  headerState,
  authState
});

export default rootReducer;
