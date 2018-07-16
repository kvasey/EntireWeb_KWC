import { fetcherCombiner } from '../util';
import {
  WEIGHT_RANGES_URL,
  PRODUCT_OPTION_VALUES_URL,
  PRODUCT_OPTIONS_URL,
  DELIVERIES_URL,
  CARRIERS_URL,
  STATES_URL,
  COUNTRIES_URL,
} from '../../constants';

export const fetchState = {
  weightRangesLocal: {
    LOADING: 'WEIGHT_RANGES_LOADING',
    ERROR: 'WEIGHT_RANGES_ERROR',
    DONE: 'WEIGHT_RANGES_DONE',
  },
  deliveriesLocal: {
    LOADING: 'DELIVERIES_LOADING',
    ERROR: 'DELIVERIES_ERROR',
    DONE: 'DELIVERIES_DONE',
  },
  countriesLocal: {
    LOADING: 'COUNTRIES_LOADING',
    ERROR: 'COUNTRIES_ERROR',
    DONE: 'COUNTRIES_DONE',
  },
  statesLocal: {
    LOADING: 'STATES_LOADING',
    ERROR: 'STATES_ERROR',
    DONE: 'STATES_DONE',
  },
  carriersLocal: {
    LOADING: 'CARRIERS_LOADING',
    ERROR: 'CARRIERS_ERROR',
    DONE: 'CARRIERS_DONE',
  },
  productOptionValuesLocal: {
    LOADING: 'PRODUCT_OPTION_VALUES_LOADING',
    ERROR: 'PRODUCT_OPTION_VALUES_ERROR',
    DONE: 'PRODUCT_OPTION_VALUES_DONE',
  },
  productOptionsLocal: {
    LOADING: 'PRODUCT_OPTIONS_LOADING',
    ERROR: 'PRODUCT_OPTIONS_ERROR',
    DONE: 'PRODUCT_OPTIONS_DONE',
  },
};

const toFetch = [
  {
    url: WEIGHT_RANGES_URL,
    states: fetchState.weightRangesLocal,
  },
  {
    url: DELIVERIES_URL,
    states: fetchState.deliveriesLocal,
  },
  {
    url: COUNTRIES_URL,
    states: fetchState.countriesLocal,
  },
  {
    url: STATES_URL,
    states: fetchState.statesLocal,
  },
  {
    url: CARRIERS_URL,
    states: fetchState.carriersLocal,
  },
  {
    url: PRODUCT_OPTION_VALUES_URL,
    states: fetchState.productOptionValuesLocal,
  },
  {
    url: PRODUCT_OPTIONS_URL,
    states: fetchState.productOptionsLocal,
  },
];

export default () => async dispatch => await fetcherCombiner(toFetch, dispatch);
