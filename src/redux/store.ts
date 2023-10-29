import { combineReducers, configureStore } from "@reduxjs/toolkit";
import koordReducer from "./koordReducer";

const rootReducers = combineReducers({ koord: koordReducer });

const persistedReducer = rootReducers;

const store = configureStore({
  reducer: persistedReducer,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
