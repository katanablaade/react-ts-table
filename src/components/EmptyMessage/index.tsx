import { TableCell, TableRow, Typography } from "@mui/material";
import { memo } from "react";

interface EmptyMessageProps {
  colSpan: number;
  message?: string;
}

export const EmptyMessage = memo(
  ({ colSpan, message = "Нет записей" }: EmptyMessageProps) => (
    <TableRow>
      <TableCell colSpan={colSpan} align='center'>
        <Typography color='textSecondary'>{message}</Typography>
      </TableCell>
    </TableRow>
  )
);
