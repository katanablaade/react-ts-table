import { createSelector } from "@reduxjs/toolkit";
import type { RecordsState } from "./recordsTypes";

const selectState = (state: { records: RecordsState }) => state.records;

export const selectRecordsState = selectState;

export const selectItems = createSelector(selectState, (state) => state.items);

export const selectLoading = createSelector(
  selectState,
  (state) => state.isLoading
);

export const selectLoadError = createSelector(
  selectState,
  (state) => state.loadError
);

export const selectIsSubmitting = createSelector(
  selectState,
  (state) => state.isSubmitting
);

export const selectSubmitError = createSelector(
  selectState,
  (state) => state.submitError
);

export const selectSubmitSuccess = createSelector(
  selectState,
  (state) => state.submitSuccess
);

export const selectHasMore = createSelector(
  selectState,
  (state) => state.hasMore
);
