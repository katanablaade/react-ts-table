import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./recordsTypes";
import { loadRecords, submitNewRecord } from "./recordsThunks";
import { API_CONFIG } from "../../api/apiConfig";

export const recordsSlice = createSlice({
  name: "records",
  initialState,
  reducers: {
    resetSubmitSuccess: (state) => {
      state.submitSuccess = false;
    },
    resetSubmitError: (state) => {
      state.submitError = null;
    },
  },
  extraReducers: (builder) => {
    // loadRecords
    builder.addCase(loadRecords.pending, (state) => {
      state.isLoading = true;
      state.loadError = null;
    });
    builder.addCase(loadRecords.fulfilled, (state, action) => {
      const payload = action.payload;
      if (payload.length > 0) {
        state.items = [...state.items, ...payload];
        state.hasMore = payload.length === API_CONFIG.LIMIT;
      } else {
        state.hasMore = false;
      }
      state.isLoading = false;
    });
    builder.addCase(loadRecords.rejected, (state, action) => {
      state.isLoading = false;
      state.loadError =
        action.payload ?? action.error.message ?? "Неизвестная ошибка";
    });

    // submitNewRecord
    builder.addCase(submitNewRecord.pending, (state) => {
      state.isSubmitting = true;
      state.submitError = null;
      state.submitSuccess = false;
    });
    builder.addCase(submitNewRecord.fulfilled, (state, action) => {
      state.isSubmitting = false;
      state.submitSuccess = true;
      state.submitError = null;
      if (!state.hasMore) {
        state.items.push(action.payload);
      }
    });
    builder.addCase(submitNewRecord.rejected, (state, action) => {
      state.isSubmitting = false;
      state.submitError = action.payload ?? "Неизвестная ошибка";
      state.submitSuccess = false;
    });
  },
});

export default recordsSlice.reducer;

export const { resetSubmitSuccess, resetSubmitError } = recordsSlice.actions;
