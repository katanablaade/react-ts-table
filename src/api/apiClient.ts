import axios from "axios";
import type { RecordItem } from "../types";

export const apiClient = axios.create({
  baseURL: "http://localhost:3001",
});

export const fetchRecords = async (start: number, limit: number) => {
  const res = await apiClient.get(`/records?&_start=${start}&_limit=${limit}`);
  return res.data;
};

export const createRecord = async (record: Omit<RecordItem, "id">) => {
  const res = await apiClient.post("/records", record);
  return res.data;
};
