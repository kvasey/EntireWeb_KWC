import { setInStore } from "../util";
import initialFetch from "../Initial/action";

export const checkoutActions = {
  PRODUCT: "SET_CHECKOUT_PRODUCT_COST",
  CARRIER: "SET_CHECKOUT_CARRIER",
  ADDRESS: "SET_CHECKOUT_ADDRESS",
  INVOICE: "SET_CHECKOUT_INVOICE",
  DELIVERIES: "SET_CHECKOUT_DELIVERIES",
  LOADING: "CHECKOUT_LOADING",
  ERROR: "CHECKOUT_ERROR"
};

export const setAddress = index => ({
  type: checkoutActions.ADDRESS,
  index
});

export const setInvoice = index => ({
  type: checkoutActions.INVOICE,
  index
});

export const setCarrier = index => ({
  type: checkoutActions.CARRIER,
  index
});

const setCost = (cost, type) => ({
  type,
  cost
});

export const setDeliveries = data => ({
  type: checkoutActions.DELIVERIES,
  data
});

export const setProductCost = products => dispatch => {
  const price = products.reduce(
    (priceSum, { combination, quantity }) =>
      calculatePrice(priceSum, combination, quantity),
    0
  );
  dispatch(setCost(price, checkoutActions.PRODUCT));
};

export const setupCarriers = data => (dispatch, getState) => {
  const products = data || getState().basket;
  dispatch(setInStore(true, checkoutActions.LOADING));
  dispatch(setInStore(false, checkoutActions.ERROR));
  const store = getState();
  const {
    countries,
    states,
    deliveries,
    weightRanges,
    carriers,
    addresses,
    checkout: { addressIndex }
  } = store;

  if (!checkStore(store)) {
    dispatch(
      setInStore(
        "An Error Occured, please try again later.",
        checkoutActions.ERROR
      )
    );
    dispatch(setInStore(false, checkoutActions.LOADING));
    return initialFetch();
  }

  if (!addresses.data.addresses)
    return dispatch(setInStore("Please Log In.", checkoutActions.ERROR));

  const address = addresses.data.addresses[addressIndex];

  const totalWeight = products.reduce(
    (weightSum, { combination, quantity }) =>
      calculateWeight(weightSum, combination, quantity),
    0
  );

  let zone = countries.data.countries.find(
    ({ id }) => parseInt(id) == parseInt(address.id_country)
  );
  if (!zone || !zone.contains_states) {
    dispatch(setInStore(false, checkoutActions.LOADING));
    return dispatch(
      setInStore("No Delivery Locations in your State", checkoutActions.ERROR)
    );
  }
  if (zone.contains_states == "1")
    zone = states.data.states.find(
      ({ id }) => parseInt(id) == parseInt(address.id_state)
    );
  if (!zone) {
    dispatch(setInStore(false, checkoutActions.LOADING));
    return dispatch(
      setInStore("No Delivery Locations in your Zone", checkoutActions.ERROR)
    );
  }

  const weightRangesFiltered = weightRanges.data.weight_ranges.filter(
    ({ delimiter1, delimiter2 }) =>
      parseFloat(delimiter1).toFixed(2) <= totalWeight &&
      totalWeight <= parseFloat(delimiter2).toFixed(2)
  );

  const tempCarriers = [];
  const filteredDeliveries = deliveries.data.deliveries
    .filter(delivery => {
      const temp = carriers.data.carriers.filter(
        ({ id }) => parseInt(id) === parseInt(delivery.id_carrier)
      );
      const price = weightRangesFiltered.filter(
        ({ id }) => parseInt(id) === parseInt(delivery.id_range_weight)
      );

      if (
        price.length > 0 &&
        temp.length > 0 &&
        parseInt(delivery.id_zone) === parseInt(zone.id_zone)
      ) {
        tempCarriers.push(temp[0]);
        return true;
      }
    })
    .map(delivery => ({
      ...delivery,
      carrier: carriers.data.carriers.find(
        ({ id }) => parseInt(delivery.id_carrier) === parseInt(id)
      )
    }))
    .sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

  if (!filteredDeliveries[0]) {
    dispatch(setInStore(false, checkoutActions.LOADING));
    return dispatch(
      setInStore("No Delivery Locations Found.", checkoutActions.ERROR)
    );
  }

  if (parseInt(filteredDeliveries[0].price) === 0) {
    const free = filteredDeliveries.shift();
    filteredDeliveries.push(free);
  }
  if (filteredDeliveries.length < 2) {
    dispatch(setInStore(false, checkoutActions.LOADING));
    return dispatch(
      setInStore("No Delivery Locations Found.", checkoutActions.ERROR)
    );
  }
  dispatch(setDeliveries(filteredDeliveries));

  return dispatch(setInStore(false, checkoutActions.LOADING));
};

const checkStore = ({
  countries,
  states,
  deliveries,
  weightRanges,
  carriers
}) =>
  countries.data.countries &&
  states.data.states &&
  deliveries.data.deliveries &&
  carriers.data.carriers &&
  weightRanges.data.weight_ranges;

export const calculatePrice = (priceSum, { price }, quantity) =>
  (parseFloat(priceSum) + parseFloat(price) * quantity).toFixed(2);

export const calculateWeight = (weightSum, { weight }, quantity) =>
  (parseFloat(weightSum) + parseFloat(weight) * quantity).toFixed(2);
