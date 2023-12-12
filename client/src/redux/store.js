import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import userSlice from './reducerSlices/userSlice'
import orderSlice from './reducerSlices/orderSlice'

import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import logger from 'redux-logger'

const persistConfig = {
  key: 'root',
  storage,
}

const reducer = combineReducers({
  user: userSlice,
  order: orderSlice
});

const persistedReducer = persistReducer(persistConfig, reducer)
export const store = configureStore({
  reducer: persistedReducer,
  middleware: [logger]
})

export const persistor = persistStore(store)
