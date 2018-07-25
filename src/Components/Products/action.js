import {
  formatIds,
  formatProductIds,
  checkResult,
  getJsonResult
} from "../util";
import {
  PRODUCTS_URL,
  PRODUCTS_PRICE_URL,
  PRODUCT_SEARCH_URL
} from "../../constants";
import { setIsProductList } from "../shared/action";

export const fetchState = {
  LOADING: "PRODUCTS_LOADING",
  ERROR: "PRODUCTS_ERROR",
  DONE: "PRODUCTS_DONE",
  CLEAR: "PRODUCTS_CLEAR",
  SORT: "PRODUCTS_SORT"
};

export const setLoading = state => ({
  type: fetchState.LOADING,
  state
});

export const setError = state => ({
  type: fetchState.ERROR,
  state
});
export const setDone = data => ({
  type: fetchState.DONE,
  data
});

export const clearData = () => ({
  type: fetchState.CLEAR
});

export const setSortType = typeIndex => ({
  type: fetchState.SORT,
  typeIndex
});

export const searchAction = query => async (dispatch, getState) => {
  dispatch(setError(null));
  dispatch(setLoading(true));
  try {
    const result = await getJsonResult(PRODUCT_SEARCH_URL + query);
    if (checkResult(result, dispatch, setError)) {
      const { products } = result;
      dispatch(setDone(products));
      dispatch(setLoading(false));
      if (products) {
        const ids = getIds(products);
        const priceResult = await getJsonResult(
          `${PRODUCTS_PRICE_URL}[${formatIds(ids)}]`
        );
        if (checkResult(priceResult, dispatch, setError)) {
          const { product_feature_values } = priceResult;
          const finalResult = getFinal(product_feature_values, products);
          dispatch(setDone(finalResult));
        }
      }
    }
  } catch (error) {
    dispatch(setLoading(false));
    dispatch(setError(error));
  }
  dispatch(setIsProductList(true));
};

export default productIds => async (dispatch, getState) => {
  dispatch(setError(null));
  dispatch(setLoading(true));
  try {
    console.log(PRODUCTS_URL + formatProductIds(productIds));
    const result = await getJsonResult(
      PRODUCTS_URL + formatProductIds(productIds)
    );
    if (checkResult(result, dispatch, setError)) {
      const { products } = result;
      dispatch(setDone(products));
      dispatch(setLoading(false));
      if (products) {
        const ids = getIds(products);
        const priceResult = await getJsonResult(
          `${PRODUCTS_PRICE_URL}[${formatIds(ids)}]`
        );
        if (checkResult(priceResult, dispatch, setError)) {
          const { product_feature_values } = priceResult;
          const finalResult = getFinal(product_feature_values, products);
          dispatch(setDone(finalResult));
        }
      }
    }
  } catch (error) {
    dispatch(setLoading(false));
    dispatch(setError(error));
  }
  dispatch(setIsProductList(true));
};

const getIds = data =>
  data.map(({ associations: { product_features } }) => {
    if (product_features[0]) return product_features[0].id_feature_value;
  });

const getFinal = (priceData, data) =>
  data.map(
    ({ associations: { product_features, ...restAssociations }, ...rest }) => {
      if (product_features[0]) {
        const price = priceData.find(
          ({ id }) =>
            parseInt(id) === parseInt(product_features[0].id_feature_value)
        );
        if (price) {
          return {
            ...rest,
            ...restAssociations,
            price: price.value
          };
        }
      }
    }
  );
