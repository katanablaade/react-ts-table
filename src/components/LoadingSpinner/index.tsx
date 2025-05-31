import { Box, CircularProgress, TableCell, TableRow } from "@mui/material";
import { memo } from "react";

interface LoadingSpinnerProps {
  colSpan: number;
  size?: number;
}

export const LoadingSpinner = memo(
  ({ colSpan, size = 24 }: LoadingSpinnerProps) => (
    <TableRow>
      <TableCell colSpan={colSpan} align='center'>
        <Box sx={{ py: 2 }}>
          <CircularProgress size={size} />
        </Box>
      </TableCell>
    </TableRow>
  )
);
