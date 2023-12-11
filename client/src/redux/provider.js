"use client";
import React from "react";
import { Provider } from "react-redux";
import {store,persistor} from "./store";
import { PersistGate } from 'redux-persist/integration/react';

const CustomProvider = ({ children }) => {
  return (<Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      {children}
      </PersistGate>
   </Provider>);
};

export default CustomProvider;