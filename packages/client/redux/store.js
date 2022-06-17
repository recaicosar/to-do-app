import { configureStore } from "@reduxjs/toolkit";
import todoReducer, { initTodos, initPriorities } from "./todos/todoSlices";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";

import { storage } from "@/utils/storage";
import { storageCheck } from "@/utils/helper";

const reducers = combineReducers({
  todos: todoReducer,
});
const persistConfig = {
  key: "tasks",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

const persistor = persistStore(store, null, () => {
  if (storageCheck("persist:tasks") === null) {
    store.dispatch(initTodos());
    store.dispatch(initPriorities());
  }
});

export { store, persistor };
