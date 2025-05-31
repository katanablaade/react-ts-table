import { memo, useCallback, useEffect } from "react";
import { Table } from "@mui/material";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useSelector } from "react-redux";
import { DataTableHeader } from "./DataTableHeader";
import { DataTableBody } from "./DataTableBody";
import { loadRecords, selectRecordsState } from "../../store/records";

export const DataTable = memo(() => {
  const dispatch = useAppDispatch();
  const { items } = useSelector(selectRecordsState);

  const loadInitialData = useCallback(() => {
    if (items.length === 0) {
      dispatch(loadRecords({ start: 0 }));
    }
  }, [items.length]);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  return (
    <Table
      sx={{
        mt: 4,
        mb: 4,
        boxShadow: 2,
        overflowX: "auto",
        borderRadius: 2,
        tableLayout: "fixed",
      }}
      size='medium'
    >
      <DataTableHeader />
      <DataTableBody />
    </Table>
  );
});
