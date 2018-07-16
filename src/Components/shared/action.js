export const fetchState = {
  SET_IS_PRODUCT: "NAVIGATOR_SET_IS_PRODUCT"
};

export const setIsProductList = state => ({
  type: fetchState.SET_IS_PRODUCT,
  state
});
