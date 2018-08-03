import { firebaseState } from "./action";
import { reducer } from "../util";

const defaultState = {
  data: [],
  error: null,
  loading: false
};

export default (state = defaultState, action) =>
  reducer(firebaseState, state, action);
