import { loginState, registrationState, userState } from "./action";

const defaultUserState = null;
const defaultRegisterState = {
  error: null,
  loading: false
};
const defaultLoginState = {
  error: null,
  loading: false
};

export const user = (state = defaultUserState, action) => {
  switch (action.type) {
    case userState.DONE:
      const user = Array.isArray(action.data) ? action.data[0] : action.data;
      return {
        id: parseInt(user.id),
        firstName: user.firstname,
        lastName: user.lastname,
        secureKey: user.secure_key,
        email: user.email
      };
    case userState.CLEAR:
      return defaultUserState;
    default:
      return state;
  }
};

export const registration = (state = defaultRegisterState, action) => {
  switch (action.type) {
    case registrationState.ERROR:
      return { ...state, error: action.state };
    case registrationState.LOADING:
      return { ...state, loading: action.state };
    default:
      return state;
  }
};

export const login = (state = defaultLoginState, action) => {
  switch (action.type) {
    case loginState.ERROR:
      return { ...state, error: action.state };
    case loginState.LOADING:
      return { ...state, loading: action.state };
    default:
      return state;
  }
};
