import { createStore, compose, applyMiddleware } from "redux";
// Redux-persist ////////////////////////////////////////////////
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
/////////////////////////////////////////////////////////////////
// import { loggerMiddleware } from "./middleware/logger";
import logger from "redux-logger";
// Asynchronous state manager choice 1 //////////////////////////
// import { thunk } from "redux-thunk";
import createSagaMiddleware from "redux-saga";

import { rootSaga } from "./root-saga";

import { rootReducer } from "./root-reducer";

// middleware below /////////////////////////////////////////////
// set some middlewares
// Redux-persist /////////////////////////////////////////////////////
const persistConfig = {
  key: "root",
  storage,
  // blacklist: ["user"],
  whitelist: ["cart"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// saga-middleware
const sagaMiddleware = createSagaMiddleware();

// const middleWares = [loggerMiddleware];
const middleWares = [
  process.env.NODE_ENV !== "production" && logger,
  sagaMiddleware,
  // thunk,
].filter(Boolean);

const composedEnhancer =
  (process.env.NODE_ENV !== "production" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

// const composedEnhancers = compose(applyMiddleware(...middleWares));
const composedEnhancers = composedEnhancer(applyMiddleware(...middleWares));

// create store //////////////////////////////////////////////////////
// export const store = createStore(rootReducer, undefined, composedEnhancers);
export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
