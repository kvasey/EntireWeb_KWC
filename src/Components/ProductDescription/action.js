import { fetcher } from "../util";
import initialFetch from "../Initial/action";
import {
  COMBINATIONS_URL,
  STOCK_AVAILABLES_URL,
  IMAGE_URL,
  KEY
} from "../../constants";

export const productState = {
  SET: "PRODUCT_SET",
  CLEAR: "PRODUCT_CLEAR"
};

export const fetchState = {
  combinationsLocal: {
    LOADING: "COMBINATIONS_LOADING",
    ERROR: "COMBINATIONS_ERROR",
    DONE: "COMBINATIONS_DONE"
  },
  stockAvailablesLocal: {
    LOADING: "STOCK_AVAILABLES_LOADING",
    ERROR: "STOCK_AVAILABLES_ERROR",
    DONE: "STOCK_AVAILABLES_DONE"
  }
};

const toFetch = [
  {
    url: COMBINATIONS_URL,
    states: fetchState.combinationsLocal
  },
  {
    url: STOCK_AVAILABLES_URL,
    states: fetchState.stockAvailablesLocal
  }
];

const setProduct = data => ({
  type: productState.SET,
  data
});
const clearProduct = () => ({
  type: productState.CLEAR
});

export default id => async (dispatch, getState) => {
  dispatch(clearProduct());
  await Promise.all(
    toFetch.map(({ url, states }) => fetcher(states, url + id, dispatch))
  );
  const {
    combinations,
    stockAvailables,
    productOptionValues,
    productOptions,
    products
  } = getState();
  if (
    !productOptions.data ||
    !products.data ||
    !productOptionValues.data ||
    !combinations.data ||
    !stockAvailables.data
  ) {
    dispatch(initialFetch());
    return null;
  }
  const localProduct = products.data.find(item => item.id === id);

  const localCombinations = localProduct.combinations.map(({ id }) => {
    const combination = combinations.data.combinations.find(
      item => parseInt(item.id, 10) === parseInt(id, 10)
    );
    const stock = stockAvailables.data.stock_availables.find(
      item => parseInt(item.id_product_attribute, 10) === parseInt(id, 10)
    );
    if (combination && stock) {
      return {
        id: parseInt(combination.id, 10),
        idProduct: parseInt(combination.id_product, 10),
        price: parseFloat(combination.price).toFixed(2),
        productOptionValues: combination.associations.product_option_values.map(
          ({ id }) => parseInt(id)
        ),
        weight: combination.weight,
        quantity: stock.quantity
      };
    }
  });

  const localProductOptions = {};

  localProduct.productOptionValues
    .map(({ id }) => {
      const pov = productOptionValues.data.product_option_values.find(
        item => parseInt(item.id, 10) === parseInt(id, 10)
      );
      if (pov) {
        return {
          id: parseInt(pov.id, 10),
          name: pov.name,
          idOption: parseInt(pov.id_attribute_group, 10)
        };
      }
    })
    .map(({ idOption, ...rest }) => {
      const option = productOptions.data.product_options.find(
        item => parseInt(item.id, 10) === idOption
      );
      if (option) {
        if (!localProductOptions[option.name])
          localProductOptions[option.name] = [];

        localProductOptions[option.name].push({ ...rest, active: false });
      }
    });

  const activeCombination =
    getActiveCombination(
      localCombinations,
      localProduct.defaultCombinationId
    ) || localCombinations[0];

  Object.keys(localProductOptions).map(key => {
    localProductOptions[key] = localProductOptions[key].map((item, index) => ({
      ...item,
      active: !!activeCombination.productOptionValues.find(
        id => parseInt(id) === parseInt(item.id)
      )
    }));
  });

  dispatch(
    setProduct({
      id: localProduct.id,
      reference: localProduct.reference,
      name: localProduct.name,
      price: localProduct.price,
      uri: getImageUri(localProduct.id, localProduct.imageId, "large_default"),
      mediumUri: getImageUri(
        localProduct.id,
        localProduct.imageId,
        "medium_default"
      ),
      cartUri: getImageUri(
        localProduct.id,
        localProduct.imageId,
        "cart_default"
      ),
      combinations: localCombinations,
      defaultCombination: activeCombination,
      productOptions: localProductOptions,
      description: localProduct.description
    })
  );
};

const getImageUri = (id, imageId, size) =>
  `${IMAGE_URL}${id}/${imageId}/${size}?${KEY}`;

const getActiveCombination = (combinations, defaultId) =>
  combinations.find(({ id }) => parseInt(defaultId) === id);
