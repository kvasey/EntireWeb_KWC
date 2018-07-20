import { favoritesActions } from "./action";

const defaultState = [];

export default (state = defaultState, action) => {
  const newState = state;
  switch (action.type) {
    case favoritesActions.ADD:
      return [...state, action.item];
    case favoritesActions.REMOVE: {
      state.splice(action.index, 1);
      return [...newState];
    }
    default:
      return state;
  }
};
