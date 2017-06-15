import { combineReducers } from "redux";
import { routerReducer as routing } from "react-router-redux";
import gameInfo from './gameReducer';

// Reducers list
const rootReducer = combineReducers({
  routing,
  gameInfo
});

export default rootReducer;
