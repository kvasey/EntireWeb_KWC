import { checkoutActions } from "./action";
import { orderActions, cartActions } from "./orderActions";
import { stripeActions, updateOrderActions } from "./stripeActions";

const defaultState = {
  productCost: 0,
  deliveryIndex: 0,
  addressIndex: 0,
  invoiceIndex: 0,
  deliveries: [],
  cart: {
    cart: null,
    loading: true,
    error: null
  },
  order: {
    order: null,
    cart: null,
    loading: true,
    error: null
  },
  stripe: {
    data: null,
    loading: true,
    error: null
  },
  orderUpdate: {
    data: null,
    loading: true,
    error: null
  },
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
    case checkoutActions.DEFAULTCARRIER:
      return {
        ...state,
        deliveryIndex: 0
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
    case orderActions.ORDER_CART_DONE:
      return {
        ...state,
        order: { ...state.order, cart: action.data }
      };
    case orderActions.ORDER_DONE:
      return {
        ...state,
        order: { ...state.order, order: action.data }
      };
    case orderActions.ERROR:
      return {
        ...state,
        order: { ...state.order, error: action.state }
      };
    case orderActions.LOADING:
      return {
        ...state,
        order: { ...state.order, loading: action.state }
      };
    case cartActions.CART_DONE:
      return {
        ...state,
        cart: { ...state.cart, cart: action.data }
      };
    case cartActions.ERROR:
      return {
        ...state,
        cart: { ...state.cart, error: action.state }
      };
    case cartActions.LOADING:
      return {
        ...state,
        cart: { ...state.cart, loading: action.state }
      };
    case stripeActions.DONE:
      return {
        ...state,
        stripe: { ...state.stripe, data: action.data }
      };
    case stripeActions.ERROR:
      return {
        ...state,
        stripe: { ...state.stripe, error: action.state }
      };
    case stripeActions.LOADING:
      return {
        ...state,
        stripe: { ...state.stripe, loading: action.state }
      };
    case updateOrderActions.DONE:
      return {
        ...state,
        orderUpdate: { ...state.orderUpdate, data: action.data }
      };
    case updateOrderActions.ERROR:
      return {
        ...state,
        orderUpdate: { ...state.orderUpdate, error: action.state }
      };
    case updateOrderActions.LOADING:
      return {
        ...state,
        orderUpdate: { ...state.orderUpdate, loading: action.state }
      };
    default:
      return state;
  }
};
