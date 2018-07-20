import { checkState, checkResult } from "../util";
import { CATEGORIES_URL } from "../../constants";

export const fetchState = {
  LOADING: "CATEGORIES_LOADING",
  ERROR: "CATEGORIES_ERROR",
  DONE: "CATEGORIES_DONE"
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

export default () => async (dispatch, getState) => {
  if (checkState(getState().categories)) {
    dispatch(setError(null));
    dispatch(setLoading(true));
    try {
      const result = await fetch(CATEGORIES_URL);
      const jsonResult = await result.json();
      if (checkResult(jsonResult, dispatch)) {
        dispatch(setDone(jsonResult));
      }
    } catch (error) {
      dispatch(setError(error));
    }
    dispatch(setLoading(false));
  }
};
