import { fetchState } from "./action";

const defaultState = {
  isProductList: false
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case fetchState.SET_IS_PRODUCT:
      return { ...state, isProductList: action.state };
    default:
      return state;
  }
};
