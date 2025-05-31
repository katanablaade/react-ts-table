import { memo } from "react";
import { TableHead, TableRow, TableCell, Typography } from "@mui/material";

import { formFields } from "../../constants/fields";

export const DataTableHeader = memo(() => {
  return (
    <TableHead sx={{ bgcolor: "#e8e8e8" }}>
      <TableRow>
        {formFields.map((field) => (
          <TableCell
            key={field.key}
            sx={{
              px: 1,
              whiteSpace: "nowrap",
              fontSize: "0.75rem",
            }}
          >
            <Typography variant='subtitle2' fontWeight='bold'>
              {field.label}
            </Typography>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
});
