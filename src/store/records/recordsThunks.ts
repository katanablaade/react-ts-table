import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchRecords, createRecord } from "../../api/apiClient";
import type { RecordItem } from "../../types";
import { API_CONFIG } from "../../api/apiConfig";

export const loadRecords = createAsyncThunk<
  RecordItem[],
  { start?: number; limit?: number },
  { rejectValue: string }
>(
  "records/loadRecords",
  async (
    { start = API_CONFIG.START, limit = API_CONFIG.LIMIT },
    { rejectWithValue }
  ) => {
    try {
      const data = await fetchRecords(start, limit);
      return data;
    } catch (err) {
      return rejectWithValue("Ошибка загрузки данных");
    }
  }
);

export const submitNewRecord = createAsyncThunk<
  RecordItem,
  Omit<RecordItem, "id">,
  { rejectValue: string }
>("records/submitNewRecord", async (data, { rejectWithValue }) => {
  try {
    const response = await createRecord(data);
    return response;
  } catch (err) {
    return rejectWithValue("Ошибка добавления сотрудника");
  }
});
