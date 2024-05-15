"use client";

import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";

const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <PersistGate
        loading={<span>loading</span>}
        persistor={persistStore(store)}
      >
        {children}
      </PersistGate>
    </Provider>
  );
};

export default ReduxProvider;
