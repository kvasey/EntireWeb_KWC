import statuses from "../../Data/statuses";

export const getDate = orderDate =>
  new Date(orderDate).toLocaleDateString("en-US");

export const getPrice = price => parseFloat(price).toFixed(2);

export const getStatus = orderStatus => statuses[orderStatus];

export const getById = (id, array) =>
  array
    ? array.length < 1
      ? null
      : array.find(item => parseInt(id) === parseInt(item.id))
    : null;

export const formatProductIds = productIds =>
  productIds.constructor === Array
    ? `[id]=[${productIds.map(p => p.id || p).join("|")}]`
    : `[id_category_default]=${productIds}`;

export const formatIds = ids =>
  ids && ids.length > 0 ? ids.toString().replace(/,/g, "|") : "";

export const checkState = ({ data, loading, error }) =>
  (data !== null || data.length > 0) && !loading && !error;

export const checkResult = (result, dispatch, setError) => {
  if (!result.errors && !result.error) {
    return true;
  }
  dispatch(setError(JSON.stringify(result)));
  return false;
};

export const getJsonResult = async url => {
  const result = await fetch(url);
  return result.json();
};

export const setInStore = (state, type) => ({
  type,
  state
});

export const setDone = (data, type) => ({
  type,
  data
});

export const reducer = (local, state, action) => {
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

export const fetcher = async (type, URL, dispatch) => {
  dispatch(setInStore(null, type.ERROR));
  dispatch(setInStore(true, type.LOADING));
  try {
    const result = await getJsonResult(URL);
    if (checkResult(result, dispatch)) {
      dispatch(setDone(result, type.DONE));
      dispatch(setInStore(false, type.LOADING));
      return result;
    }
  } catch (error) {
    dispatch(setInStore(error, type.ERROR));
  }
  dispatch(setInStore(false, type.LOADING));
};

export const openFetcher = async (fetchData, type, dispatch, expect) => {
  dispatch(setInStore(null, type.ERROR));
  dispatch(setInStore(true, type.LOADING));
  try {
    const result = await fetchData();
    if (checkResult(result, dispatch, error => setInStore(error, type.ERROR))) {
      dispatch(setDone(result[expect], type.DONE));
      dispatch(setInStore(false, type.LOADING));
      return result;
    }
  } catch (error) {
    dispatch(setInStore(false, type.LOADING));
    dispatch(setInStore(error, type.ERROR));
  }
};

export const fetcherCombiner = (toFetch, dispatch) =>
  Promise.all(toFetch.map(({ url, states }) => fetcher(states, url, dispatch)));
