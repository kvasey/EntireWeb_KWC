import { basketActions } from "./action";

const defaultState = [];

export default (state = defaultState, action) => {
  const newState = state;
  switch (action.type) {
    case basketActions.ADD:
      return [...state, action.item];
    case basketActions.REMOVE: {
      state.splice(action.index, 1);
      return [...newState];
    }
    case basketActions.SET: {
      newState[action.index] = { ...newState[action.index], ...action.item };
      return [...newState];
    }
    case basketActions.CLEAR:
      return [...defaultState];
    default:
      return state;
  }
};
