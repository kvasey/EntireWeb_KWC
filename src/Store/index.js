import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import rootReducer from "./rootReducer";
import { persistStore } from "redux-persist";

const logger = createLogger({
  level: "info",
  collapsed: true
});

const middleware = applyMiddleware(thunk, logger);

const createAppStore = () => {
  let store = createStore(rootReducer, middleware);
  let persistor = persistStore(store);

  return { store, persistor };
};
export default createAppStore;
