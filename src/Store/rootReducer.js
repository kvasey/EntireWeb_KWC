import storage from "redux-persist/es/storage";
import { persistCombineReducers } from "redux-persist";

import categories from "../Components/Categories/reducer";
import products from "../Components/Products/reducer";
import basket from "../Components/BasketList/reducer";
import checkout from "../Components/Checkout/reducer";
import favorites from "../Components/Favorites/reducer";
import shared from "../Components/shared/reducer";

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

import {
  addresses,
  orders,
  createAddress
} from "../Components/Profile/reducer";

const config = {
  key: "primary",
  storage,
  // whitelist: []
  blacklist: [
    "products",
    "stockAvailables",
    "combinations",
    "product",
    "login",
    "registration",
    "createAddress",
    "checkout"
  ]
};

const combinedReducers = {
  categories,
  products,

  product,
  stockAvailables,
  combinations,

  login,
  registration,
  user,

  orders,
  addresses,
  createAddress,

  shared,

  basket,
  favorites,
  checkout,

  weightRanges,
  deliveries,
  countries,
  states,
  carriers,
  productOptionValues,
  productOptions
};

export default persistCombineReducers(config, combinedReducers);
