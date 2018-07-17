export const Color = {
  main: "#7c7c7c",
  secondary: "#b61e89"
};

export const SortTypes = [
  { name: "Price Descending", active: true },
  { name: "Price Ascending", active: false },
  { name: "Name A-Z", active: false },
  { name: "Name Z-A", active: false }
];

export const defaultCategoryId = -69;
// REGEX
export const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// URL
const BASE_URL = "https://www.kidswholesaleclothing.co.uk/api/";
const OUTPUT = "output_format=JSON";
const IMAGE = "images/products/";
export const KEY = "ws_key=F5ZNKQZZSSH5SSH4114CMI4I691Q4FW4";
export const CKEY = "6DdKR6FbVz1ikuBO2tpJi1xmeBhsz8GMUkaD6BaMeeFLOg3d7OHQwVBv";

// USER - ORDERS
export const CUSTOMER_ORDERS_URL = `${BASE_URL}orders?${OUTPUT}&display=full&${KEY}&filter[id_customer]=`;

export const REGISTER_URL = `${BASE_URL}customers?${OUTPUT}&${KEY}&schema=blank`;
export const LOGIN_URL = `${BASE_URL}customers?${OUTPUT}&display=full&filter[active]=1&${KEY}`;

export const ADDRESSES_URL = `${BASE_URL}addresses?${OUTPUT}&display=full&filter[deleted]=[0]&${KEY}&filter[id_customer]=`;

export const CREATE_ADDRESS_URL = `${BASE_URL}addresses?${OUTPUT}&${KEY}&schema=blank`;

export const CATEGORIES_URL = `${BASE_URL}categories?${OUTPUT}&filter[active]=1&display=full&${KEY}`;

export const PRODUCTS_URL = `${BASE_URL}products?${OUTPUT}&display=full${
  /* [id_default_image,id,name,wholesale_price] */ ""
}&filter[active]=1&${KEY}&filter`;
export const IMAGE_URL = `${BASE_URL + IMAGE}`;

export const PRODUCT_DESC_URL = `${BASE_URL}products?${OUTPUT}&display=full&filter[active]=1&${KEY}&filter[id]=`;

export const PRODUCTS_PRICE_URL = `${BASE_URL}product_feature_values?${OUTPUT}&display=[id,value]&${KEY}&filter[id]=`;

export const COMBINATION_VAT = [1482, 1483, 1484, 1485, 1480, 1481];

export const COMBINATIONS_URL = `${BASE_URL}combinations?${OUTPUT}&display=full&${KEY}&filter[id_product]=`;

export const STOCK_AVAILABLES_URL = `${BASE_URL}stock_availables?${OUTPUT}&display=full&${KEY}&filter[id_product]=`;

export const COUNTRIES_URL = `${BASE_URL}countries?${OUTPUT}&display=full&filter[active]=1&${KEY}`;

export const STATES_URL = `${BASE_URL}states?${OUTPUT}&display=full&filter[active]=1&${KEY}`;

export const PRODUCT_OPTIONS_URL = `${BASE_URL}product_options?${OUTPUT}&display=[id,name]&${KEY}`;

export const PRODUCT_OPTION_VALUES_URL = `${BASE_URL}product_option_values?${OUTPUT}&display=full&${KEY}`;

export const PRODUCT_SEARCH_URL = `${BASE_URL}products?${OUTPUT}&display=full&${KEY}&filter[active]=1&filter[name]=`;

export const DELIVERIES_URL = `${BASE_URL}deliveries?${OUTPUT}&display=full&${KEY}`;

export const CARRIERS_URL = `${BASE_URL}carriers?${OUTPUT}&display=full&filter[active]=1&filter[deleted]=0&${KEY}`;

export const WEIGHT_RANGES_URL = `${BASE_URL}weight_ranges?${OUTPUT}&display=full&${KEY}`;

export const CART_CREATE_URL = `${BASE_URL}carts?${OUTPUT}&${KEY}&schema=blank`;

export const ORDER_CREATE_URL = `${BASE_URL}orders?${OUTPUT}&${KEY}&schema=blank`;

export const ORDER_STATUS_URL = `${BASE_URL}order_histories?${KEY}&${OUTPUT}`;

export const STRIPE_URL =
  "https://wt-62f326f8f8642c3228b1f956ceae13ea-0.run.webtask.io/stripe-payment";
// https://sandbox.auth0-extend.com/edit/wt-62f326f8f8642c3228b1f956ceae13ea-0#webtaskName=stripe-payment&token=eyJhbGciOiJIUzI1NiIsImtpZCI6IjIifQ.eyJqdGkiOiI0OWE5NDRjYmE4M2Q0MmU0OGU4ODIzZTIzMjFhZDFjOSIsImlhdCI6MTUyMTEyNjIyOCwiY2EiOlsiOTAwNzMzNGRiMDhjNGQ2M2E0MTNjZGFmM2YzYjYxNGMiXSwiZGQiOjEsInRlbiI6Ii9ed3QtNjJmMzI2ZjhmODY0MmMzMjI4YjFmOTU2Y2VhZTEzZWEtWzAtMV0kLyJ9.R802rdanrgPOmTpSM-Tx_kiVZdjyw9gQq-0ayNc4Q9g
