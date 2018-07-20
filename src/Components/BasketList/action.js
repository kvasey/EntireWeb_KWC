export const basketActions = {
  ADD: "BASKET_ADD",
  REMOVE: "BASKET_REMOVE",
  SET: "BASKET_SET",
  CLEAR: "BASKET_CLEAR"
};

export const basketAdd = item => ({
  type: basketActions.ADD,
  item
});

export const basketRemove = index => ({
  type: basketActions.REMOVE,
  index
});
export const basketSetItem = (index, item) => ({
  type: basketActions.SET,
  index,
  item
});

export const basketClear = () => ({
  type: basketActions.CLEAR
});
