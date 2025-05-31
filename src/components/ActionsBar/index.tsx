import { memo, useCallback, useState } from "react";
import { Button, Box } from "@mui/material";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { resetSubmitError } from "../../store/records/recordsSlice";
import { RecordModal } from "../RecordModal";
import { NotificationBar } from "../NotificationBar";

export const ActionsBar = memo(() => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();

  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => {
    dispatch(resetSubmitError());
    setOpen(false);
  }, [dispatch]);

  return (
    <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
      <Button
        variant='contained'
        color='primary'
        onClick={handleOpen}
        disabled={open}
        sx={{ height: 48 }}
      >
        Добавить
      </Button>
      <NotificationBar />
      <RecordModal open={open} handleClose={handleClose} />
    </Box>
  );
});
