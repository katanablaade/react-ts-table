import { memo } from "react";
import { Box, Alert } from "@mui/material";

type SeverityType = "success" | "info" | "warning" | "error";

interface AlertMessageProps {
  severity: SeverityType;
  message: string;
}

export const AlertMessage = memo(({ severity, message }: AlertMessageProps) => {
  return (
    <Box>
      <Alert severity={severity}>{message}</Alert>
    </Box>
  );
});
