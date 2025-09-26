// redux/Store.js
import { configureStore } from "@reduxjs/toolkit";
import RootReducer from "./reducers/RootReducer";

export const store = configureStore({
  reducer: RootReducer,
  devTools: process.env.NODE_ENV !== "production",
  // thunk đã có sẵn trong getDefaultMiddleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // bật/tắt theo nhu cầu dự án
      serializableCheck: false,   // tắt nếu bạn có history, Date, class instances...
      // immutableCheck: false,
    }),
});
