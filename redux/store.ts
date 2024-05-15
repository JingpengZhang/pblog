import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userDataReducer from "./slices/user-data";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";

// 合并 reducer
const reducers = combineReducers({
  userData: userDataReducer,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  timeout: 10,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddware) =>
    getDefaultMiddware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
