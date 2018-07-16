import { reducer } from "../util";
import { fetchState, productState } from "./action";

const { stockAvailablesLocal, combinationsLocal } = fetchState;

const defaultState = {
  data: [],
  error: null,
  loading: false
};

const productDefaultState = {
  id: null,
  uri: null,
  name: "",
  price: "",
  description: "",
  combinations: [],
  productOptions: []
};

export const stockAvailables = (state = defaultState, action) =>
  reducer(stockAvailablesLocal, state, action);
export const combinations = (state = defaultState, action) =>
  reducer(combinationsLocal, state, action);

export const product = (state = productDefaultState, action) => {
  switch (action.type) {
    case productState.SET:
      return { ...state, ...action.data };
    case productState.CLEAR:
      return { ...productDefaultState };
    default:
      return state;
  }
};
