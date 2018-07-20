import { orderState, addressesState, createAddressState } from "./action";
import { reducer } from "../util";

const defaultState = {
  data: [],
  error: null,
  loading: false
};

export const orders = (state = defaultState, action) =>
  reducer(orderState, state, action);

export const addresses = (state = defaultState, action) => {
  if (action.type === addressesState.CLEAR) {
    return defaultState;
  }
  return reducer(addressesState, state, action);
};

export const createAddress = (state = defaultState, action) =>
  reducer(createAddressState, state, action);
