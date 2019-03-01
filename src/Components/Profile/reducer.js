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
  switch (action.type) {
    case addressesState.CLEAR:
      return defaultState;
    case addressesState.UPDATE: {
      if (state.data.addresses) {
        const newData = state.data.addresses;
        const index = newData.findIndex(
          ({ id }) => id === parseInt(action.data.address.id)
        );
        if (index >= 0) {
          newData[index] = action.data.address;
        } else {
          newData.push(action.data.address);
        }
        return { ...state, data: { addresses: newData } };
      } else {
        const newData = [];
        newData.push(action.data.address);
        return { ...state, data: { addresses: newData } };
      }
    }
    default:
      return reducer(addressesState, state, action);
  }
};

export const createAddress = (state = defaultState, action) =>
  reducer(createAddressState, state, action);
