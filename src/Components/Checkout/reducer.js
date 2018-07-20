import { checkoutActions } from "./action";

const defaultState = {
  productCost: 0,
  deliveryIndex: 0,
  addressIndex: 0,
  deliveries: [],
  loading: true,
  error: null
};

export default (state = defaultState, action) => {
  const newState = state;
  switch (action.type) {
    case checkoutActions.PRODUCT:
      return {
        ...state,
        productCost: action.cost
      };
    case checkoutActions.DELIVERIES:
      return {
        ...state,
        deliveries: action.data
      };
    case checkoutActions.LOADING:
      return {
        ...state,
        loading: action.state
      };
    case checkoutActions.ERROR:
      return {
        ...state,
        error: action.state
      };
    default:
      return state;
  }
};
