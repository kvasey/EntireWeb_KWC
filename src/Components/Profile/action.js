import { fetcher, openFetcher } from "../util";
import {
  ADDRESSES_URL,
  CUSTOMER_ORDERS_URL,
  CREATE_ADDRESS_URL
} from "../../constants";

export const orderState = {
  LOADING: "ORDERS_LOADING",
  ERROR: "ORDERS_ERROR",
  DONE: "ORDERS_DONE"
};

export const addressesState = {
  LOADING: "ADDRESSES_LOADING",
  ERROR: "ADDRESSES_ERROR",
  DONE: "ADDRESSES_DONE",
  CLEAR: "ADDRESSES_CLEAR"
};

export const createAddressState = {
  LOADING: "CREATE_ADDRESS_LOADING",
  ERROR: "CREATE_ADDRESS_ERROR",
  DONE: "CREATE_ADDRESS_DONE"
};

export const clearAddresses = () => ({
  type: addressesState.CLEAR
});

export const getAddresses = id => dispatch =>
  fetcher(addressesState, ADDRESSES_URL + id, dispatch);

export const getOrders = id => dispatch =>
  fetcher(orderState, CUSTOMER_ORDERS_URL + id, dispatch);

export const createAddress = data => dispatch =>
  openFetcher(
    async () => {
      const result = await fetch(CREATE_ADDRESS_URL, {
        method: data.update ? "PUT" : "POST",
        body: jsonToXML(data)
      });
      return result.json();
    },
    createAddressState,
    dispatch,
    "address"
  );

const jsonToXML = address => {
  const newCountry = address.countries[address.countryIndex];
  const newState = address.states[address.stateIndex];

  return `
  <prestashop>
    <address>
    ${address.update ? `<id>${address.id}</id>` : ""}
    <id_customer>${address.userId}</id_customer>
    <id_country>${newCountry.id}</id_country>
    <id_state>${newCountry.contains_states ? newState.id : "0"}</id_state>
    <alias>${address.alias}</alias>
    <lastname>${address.lastName}</lastname>
    <firstname>${address.firstName}</firstname>
    <address1>${address.address1}</address1>
    <address2>${address.address2}</address2>
    <postcode>${address.postcode}</postcode>
    <city>${address.city}</city>
    <other>""</other>
    <phone>${address.phone}</phone>
    <phone_mobile>${address.phone}</phone_mobile>
    </address>
  </prestashop>`;
};
