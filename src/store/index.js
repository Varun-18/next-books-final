import { combineReducers, configureStore } from "@reduxjs/toolkit";
import _ from "lodash";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import mainReducer from "./slice";

const reducer = combineReducers({
  mainReducer,
});

const masterReducer = (state, action) => {

  if (action.type === HYDRATE) {
    
    // console.log(action.payload, "*** Action ***");
    // console.log(state, "*** STATE ***");

    let nextState = { ...state };

    if (_.size(action.payload.mainReducer.books) !== 0) {
      nextState = {
        ...action.payload,
        mainReducer: { ...action.payload.mainReducer },
      };
    } else if (_.size(state.mainReducer.books) !== 0) {

      nextState = {
        ...state,
        mainReducer: { ...state.mainReducer },
      };
    }

    return nextState;

  } else {

    return reducer(state, action);

  }
};

const store = configureStore({
  reducer: masterReducer,
});

const makeStore = () => store;

export const wrapper = createWrapper(makeStore);
