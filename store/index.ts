import { createStore, combineReducers } from "redux";
import tocReducer from "./toc";

const store = createStore(combineReducers({ toc: tocReducer }));

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
