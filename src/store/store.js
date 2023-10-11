// src/store.js
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import loaderReducer from "./loaderSlice";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['loader'], // reducer slices to persist
  };
  
  const rootReducer = combineReducers({
    loader: loaderReducer,
  });
  
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  
  export const store = configureStore({
      reducer: persistedReducer,
  });
  
  export const persistor = persistStore(store);
