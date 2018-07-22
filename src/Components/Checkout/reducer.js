import { checkoutActions } from "./action";

const defaultState = {
  productCost: 0,
  deliveryIndex: 0,
  addressIndex: 0,
  invoiceIndex: 0,
  deliveries: [],
  loading: true,
  error: null
};

export default (state = defaultState, action) => {
  const newState = state;
  switch (action.type) {
    case checkoutActions.ADDRESS:
      return {
        ...state,
        addressIndex: action.index
      };
    case checkoutActions.INVOICE:
      return {
        ...state,
        invoiceIndex: action.index
      };
    case checkoutActions.CARRIER:
      return {
        ...state,
        deliveryIndex: action.index
      };
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
