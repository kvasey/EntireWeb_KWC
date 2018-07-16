import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import { persistStore } from "redux-persist";
import { Alert } from "react-native";
import rootReducer from "./rootReducer";

let middleware = applyMiddleware(thunk);
if (__DEV__) {
  const logger = createLogger({
    level: "info",
    collapsed: true
  });
  middleware = applyMiddleware(thunk, logger);
}

Alert.alert(JSON.stringify(__DEV__));
export default () => {
  const store = createStore(rootReducer, middleware);
  const persistor = persistStore(store);

  return { store, persistor };
};
