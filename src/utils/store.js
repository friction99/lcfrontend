import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { combineReducers } from "redux";
import authReducer from './authSlice';
import blogReducer from './blogSlice';

// Persist config for redux-persist
const persistConfig = {
  key: 'root',
  storage,
};

// Combine your reducers
const rootReducer = combineReducers({
  auth: authReducer,
  blog: blogReducer,
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store with persisted reducer
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      // Ignore these action types in the serializable check
      ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"]
    }
  })
});

// Create a persistor
const persistor = persistStore(store);

export { store, persistor };
