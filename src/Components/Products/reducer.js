import { IMAGE_URL, KEY, SortTypes } from '../../constants';
import { fetchState } from './action';

const defaultState = {
  data: [],
  error: null,
  loading: false,
  sortType: SortTypes[0],
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
      return { ...state, data: sortData(state.data, action.sortType), sortType: action.sortType };
    case fetchState.CLEAR:
      return { ...defaultState };
    default:
      return state;
  }
};

const sortData = (products, sortType) => {
  switch (SortTypes.findIndex(type => type === sortType)) {
    case 1:
      return products.sort((a, b) => a.price - b.price);
    case 2:
      return products.sort((a, b) => a.name.localeCompare(b.name));
    case 3:
      return products.sort((a, b) => b.name.localeCompare(a.name));
    case 0:
    default:
      return products.sort((a, b) => b.price - a.price);
  }
};
const reduceData = products => (!products
  ? []
  : products.map(
    ({
      id,
      name,
      reference,
      id_default_image,
      description,
      price,
      combinations,
      product_option_values,
    }) => ({
      id,
      name,
      description,
      reference,
      price: parseFloat(price),
      imageUri: getImageUri(id, id_default_image),
      imageId: id_default_image,
      combinations,
      productOptionValues: product_option_values,
    }),
  ));

const getImageUri = (id, imageId) => `${IMAGE_URL}${id}/${imageId}/medium_default?${KEY}`;
