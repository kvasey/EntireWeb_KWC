import { fetchState } from './action';

const {
  weightRangesLocal,
  deliveriesLocal,
  countriesLocal,
  statesLocal,
  carriersLocal,
  productOptionValuesLocal,
  productOptionsLocal,
} = fetchState;

const defaultState = {
  data: [],
  error: null,
  loading: false,
};

export const weightRanges = (state = defaultState, action) => reducer(weightRangesLocal, state, action);
export const deliveries = (state = defaultState, action) => reducer(deliveriesLocal, state, action);
export const countries = (state = defaultState, action) => reducer(countriesLocal, state, action);
export const states = (state = defaultState, action) => reducer(statesLocal, state, action);
export const carriers = (state = defaultState, action) => reducer(carriersLocal, state, action);
export const productOptions = (state = defaultState, action) => reducer(productOptionsLocal, state, action);
export const productOptionValues = (state = defaultState, action) => reducer(productOptionValuesLocal, state, action);

const reducer = (local, state, action) => {
  switch (action.type) {
    case local.ERROR:
      return { ...state, error: action.state };
    case local.LOADING:
      return { ...state, loading: action.state };
    case local.DONE:
      return { ...state, data: action.data };
    default:
      return state;
  }
};
