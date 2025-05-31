import type { RecordItem } from "../../types";

export type RecordsState = {
  items: RecordItem[];
  isLoading: boolean;
  loadError: string | null;
  isSubmitting: boolean;
  submitError: string | null;
  submitSuccess: boolean;
  hasMore: boolean;
};

export const initialState: RecordsState = {
  items: [],
  isLoading: false,
  loadError: null,
  isSubmitting: false,
  submitError: null,
  submitSuccess: false,
  hasMore: true,
};
