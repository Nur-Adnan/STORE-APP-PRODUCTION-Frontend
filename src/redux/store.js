import { legacy_createStore, combineReducers } from 'redux';
import { rootReducer } from './rootReducer';

const finalReducer = combineReducers({
  root: rootReducer
});

const initialState = {
  root: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
};

const store = legacy_createStore(finalReducer, initialState);

export default store;
