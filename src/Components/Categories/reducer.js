import { fetchState } from "./action";
import { defaultCategoryId } from "../../constants";
import catConfig from "../../Data/categories";

const defaultState = {
  data: [],
  error: null,
  loading: false
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case fetchState.ERROR:
      return { ...state, error: action.state };
    case fetchState.LOADING:
      return { ...state, loading: action.state };
    case fetchState.DONE: {
      const data = flattenCategories(action.data);
      return { ...state, data };
    }

    default:
      return state;
  }
};

const flattenCategories = ({ categories }) => {
  if (!categories) return [];

  const flat = categories
    .filter(({ associations }) => associations)
    .map(({ id, id_parent, name, associations: { products }, active }) => ({
      id: parseInt(id),
      idParent: parseInt(id_parent),
      name,
      childCount: countChildren(categories, id),
      products,
      active: active === "1"
    }));

  return flat
    .map(({ id, idParent, name, childCount, products, active }, index) => {
      const category = catConfig.find(
        ({ categoryId }) => parseInt(categoryId) === id && active
      );
      const categoryItem = { id, name, childCount, products };
      return category
        ? {
            ...categoryItem,
            idParent: defaultCategoryId,
            image: category.image,
            position: category.position
          }
        : { idParent, ...categoryItem, position: index };
    })
    .sort((a, b) => a.position - b.position);
};

const countChildren = (categories, id) =>
  categories.filter(({ id_parent }) => parseInt(id_parent) === parseInt(id))
    .length;
