export const favoritesActions = {
  ADD: "FAVORITES_ADD",
  REMOVE: "FAVORITES_REMOVE"
};

export const favoritesAdd = item => ({
  type: favoritesActions.ADD,
  item
});

export const favoritesRemove = index => ({
  type: favoritesActions.REMOVE,
  index
});
