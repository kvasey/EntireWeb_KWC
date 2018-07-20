import { fetchState } from "./action";
import { reducer } from "../util";

const {
  weightRangesLocal,
  deliveriesLocal,
  countriesLocal,
  statesLocal,
  carriersLocal,
  productOptionValuesLocal,
  productOptionsLocal
} = fetchState;

const defaultState = {
  data: [],
  error: null,
  loading: false
};

export const weightRanges = (state = defaultState, action) =>
  reducer(weightRangesLocal, state, action);

export const deliveries = (state = defaultState, action) =>
  reducer(deliveriesLocal, state, action);

export const countries = (state = defaultState, action) =>
  reducer(countriesLocal, state, action);

export const states = (state = defaultState, action) =>
  reducer(statesLocal, state, action);

export const carriers = (state = defaultState, action) =>
  reducer(carriersLocal, state, action);

export const productOptions = (state = defaultState, action) =>
  reducer(productOptionsLocal, state, action);

export const productOptionValues = (state = defaultState, action) =>
  reducer(productOptionValuesLocal, state, action);
