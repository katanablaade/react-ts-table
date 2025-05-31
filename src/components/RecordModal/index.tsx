import { memo } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { RecordForm } from "../RecordForm";

interface RecordModalProps {
  open: boolean;
  handleClose: () => void;
}

export const RecordModal = memo(({ open, handleClose }: RecordModalProps) => {
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth='md'>
      <DialogContent>
        <RecordForm onClose={handleClose} />
      </DialogContent>
    </Dialog>
  );
});
