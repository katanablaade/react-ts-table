import { memo, useCallback, useRef } from "react";
import {
  TableBody,
  TableRow,
  TableCell,
  Box,
  CircularProgress,
} from "@mui/material";

import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { LoadingSpinner } from "../LoadingSpinner";
import { EmptyMessage } from "../EmptyMessage";
import { formFields } from "../../constants/fields";
import { useSelector } from "react-redux";
import { loadRecords, selectRecordsState } from "../../store/records";

export const DataTableBody = memo(() => {
  const dispatch = useAppDispatch();
  const { items, isLoading, hasMore, loadError } =
    useSelector(selectRecordsState);
  const lastRowRef = useRef<HTMLTableRowElement | null>(null);

  const loadMore = useCallback(() => {
    if (!hasMore || isLoading) return;
    dispatch(loadRecords({ start: items.length }));
  }, [items.length, hasMore, isLoading]);

  useInfiniteScroll({
    ref: lastRowRef,
    hasMore,
    isLoading,
    onLoadMore: loadMore,
  });

  if (isLoading && items.length === 0) {
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={formFields.length} align='center'>
            <Box sx={{ py: 4 }}>
              <CircularProgress />
            </Box>
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  if (items.length === 0 && !loadError && !isLoading) {
    return (
      <TableBody>
        <EmptyMessage colSpan={formFields.length} message='Нет записей' />
      </TableBody>
    );
  }

  return (
    <TableBody>
      {items.map((item, index) => {
        const isLastItem = index === items.length - 1;

        return (
          <TableRow
            key={item.id}
            hover
            ref={isLastItem ? lastRowRef : undefined}
            sx={{
              transition: "background-color 0.2s",
              "&:hover": { backgroundColor: "#f9f9f9" },
            }}
          >
            {formFields.map((field) => (
              <TableCell
                key={field.key}
                sx={{
                  px: 1,
                  whiteSpace: "nowrap",
                  fontSize: "0.9rem",
                  maxWidth: 150,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {String(item[field.key as keyof typeof item])}
              </TableCell>
            ))}
          </TableRow>
        );
      })}

      {isLoading && items.length > 0 && (
        <LoadingSpinner colSpan={formFields.length} size={24} />
      )}
    </TableBody>
  );
});
