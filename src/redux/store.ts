import { combineReducers, configureStore } from "@reduxjs/toolkit";
import koordReducer from "./koordReducer";
import gameReducer from "./gameReducer";

const rootReducers = combineReducers({
  koord: koordReducer,
  game: gameReducer,
});

const persistedReducer = rootReducers;

const store = configureStore({
  reducer: persistedReducer,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
