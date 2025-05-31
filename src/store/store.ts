import { configureStore } from "@reduxjs/toolkit";
import recordsSlice from "./records/recordsSlice";

export const store = configureStore({
  reducer: {
    records: recordsSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
