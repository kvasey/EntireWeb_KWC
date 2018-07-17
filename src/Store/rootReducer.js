import storage from "redux-persist/es/storage";
import { persistCombineReducers } from "redux-persist";
import categories from "../Components/Categories/reducer";
import products from "../Components/Products/reducer";
import {
  weightRanges,
  deliveries,
  countries,
  states,
  carriers,
  productOptionValues,
  productOptions
} from "../Components/Initial/reducer";
import {
  stockAvailables,
  combinations,
  product
} from "../Components/ProductDescription/reducer";

import { login, registration, user } from "../Components/Auth/reducer";

import shared from "../Components/shared/reducer";

const config = {
  key: "primary",
  storage,
  blacklist: [
    "products",
    "stockAvailables",
    "combinations",
    "product",
    "login",
    "registration"
  ]
};

export default persistCombineReducers(config, {
  categories,
  products,

  product,
  stockAvailables,
  combinations,

  login,
  registration,
  user,

  shared,

  weightRanges,
  deliveries,
  countries,
  states,
  carriers,
  productOptionValues,
  productOptions
});
