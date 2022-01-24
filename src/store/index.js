import { configureStore, combineReducers } from "@reduxjs/toolkit";

import createSagaMiddleware from "redux-saga";
import gradebooksReducer from "./gradebooks/slice";
import teachersReducer from "./teachers/slice";
import authReducer from "./auth/slice";
import sagas from "./sagas";

const sagaMiddleware = createSagaMiddleware();

//dodato

const store = configureStore({
   reducer: {
    gradebooks: gradebooksReducer,
    teachers: teachersReducer,
    auth: authReducer,
  },                                   //dodato
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ 
      thunk: false,
      serializableCheck: false, 
    }).concat(sagaMiddleware),
});

for (const saga in sagas) {
  sagaMiddleware.run(sagas[saga]);
}

export default store;