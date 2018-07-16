import storage from 'redux-persist/es/storage';
import { persistCombineReducers } from 'redux-persist';
import homeReducer from '../Components/Home/reducer';
import categories from '../Components/Categories/reducer';
import products from '../Components/Products/reducer';
import {
  weightRanges,
  deliveries,
  countries,
  states,
  carriers,
  productOptionValues,
  productOptions,
} from '../Components/Initial/reducer';
import { stockAvailables, combinations, product } from '../Components/ProductDescription/reducer';

const config = {
  key: 'primary',
  storage,
  blacklist: ['products', 'stockAvailables', 'combinations', 'product'],
};

export default persistCombineReducers(config, {
  homeReducer,
  categories,
  products,

  product,
  stockAvailables,
  combinations,

  weightRanges,
  deliveries,
  countries,
  states,
  carriers,
  productOptionValues,
  productOptions,
});
