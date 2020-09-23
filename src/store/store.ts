import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

import { search } from "./search/reducer";

export const rootReducer = combineReducers({
  search
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
