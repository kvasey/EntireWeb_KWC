export const formatProductIds = productIds => (productIds.constructor === Array
  ? `[id]=[${productIds.map(p => p.id || p).join('|')}]`
  : `[id_category_default]=${productIds}`);

export const formatIds = ids => (ids && ids.length > 0 ? ids.toString().replace(/,/g, '|') : '');

export const checkState = ({
  data, loading, error, expiry,
}) => ((data !== null || data.length > 0) && !loading && !error) || expiry <= new Date();

export const checkResult = (result, dispatch, setError) => {
  if (!result.errors && !result.error) {
    return true;
  }
  dispatch(setError(JSON.stringify(result)));
  return false;
};

export const getJsonResult = async (url) => {
  const result = await fetch(url);
  return result.json();
};

export const setInStore = (state, type) => ({
  type,
  state,
});

export const setDone = (data, type) => ({
  type,
  data,
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

export const fetcher = async (localfetchState, URL, dispatch) => {
  dispatch(setInStore(null, localfetchState.ERROR));
  dispatch(setInStore(true, localfetchState.LOADING));
  try {
    const result = await getJsonResult(URL);
    if (checkResult(result, dispatch)) {
      dispatch(setDone(result, localfetchState.DONE));
    }
  } catch (error) {
    dispatch(setInStore(error, localfetchState.ERROR));
  }
  dispatch(setInStore(false, localfetchState.LOADING));
};

export const fetcherCombiner = (toFetch, dispatch) => Promise.all(toFetch.map(({ url, states }) => fetcher(states, url, dispatch)));
