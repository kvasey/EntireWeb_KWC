import { fetcher} from "../util";
import {
  FIREBASE_URL
} from "../../constants";

export const firebaseState = {
  LOADING: "FIREBASE_LOADING",
  ERROR: "FIREBASE_ERROR",
  DONE: "FIREBASE_DONE"
};

export const getFirebase = id => dispatch =>
  fetcher(firebaseState, FIREBASE_URL, dispatch);
