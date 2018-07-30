import { IMAGE_URL, KEY, SortTypes } from "../../constants";
import { fetchState } from "./action";
import vatProducts from "../../Data/vatProducts";

const defaultState = {
  data: [],
  error: null,
  loading: false,
  activeSortIndex: 0
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case fetchState.ERROR:
      return { ...state, error: action.state };
    case fetchState.LOADING:
      return { ...state, loading: action.state };
    case fetchState.DONE:
      return { ...state, data: reduceData(action.data) };
    case fetchState.SORT:
      return {
        ...state,
        data: sortData(state.data, action.typeIndex),
        activeSortIndex: action.typeIndex
      };
    case fetchState.CLEAR:
      return { ...defaultState };
    default:
      return state;
  }
};

const sortData = (data, typeIndex) => {
  switch (typeIndex) {
    case 1:
      return data.sort((a, b) => a.price - b.price);
    case 2:
      return data.sort((a, b) => a.name.localeCompare(b.name));
    case 3:
      return data.sort((a, b) => b.name.localeCompare(a.name));
    case 0:
    default:
      return data.sort((a, b) => b.price - a.price);
  }
};
const reduceData = products =>
  !products
    ? []
    : products.map(
        ({
          id,
          name,
          reference,
          id_default_image,
          description_short,
          price,
          combinations,
          product_option_values,
          id_default_combination,
          associations
        }) => ({
          id,
          name,
          description: description_short,
          reference,
          price: parseFloat(price),
          isVat: checkVat(id),
          imageUri: getImageUri(id, id_default_image),
          imageId: id_default_image,
          combinations: combinations || associations.combinations,
          productOptionValues:
            product_option_values || associations.product_option_values,
          defaultCombinationId: id_default_combination
        })
      );

const getImageUri = (id, imageId) =>
  `${IMAGE_URL}${id}/${imageId}/medium_default?${KEY}`;

const checkVat = productId =>
  !!vatProducts.find(id => parseInt(productId) === id);
