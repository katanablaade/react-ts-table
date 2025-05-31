import { memo, useCallback } from "react";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { resetSubmitSuccess } from "../../store/records/recordsSlice";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { AlertMessage } from "../AlertMessage";
import { useAutoHideNotification } from "../../hooks/useAutoHideNotification";
import { selectRecordsState } from "../../store/records";

export const NotificationBar = memo(() => {
  const dispatch = useAppDispatch();
  const { submitSuccess, loadError } = useSelector(selectRecordsState);

  const hideSuccess = useCallback(() => {
    dispatch(resetSubmitSuccess());
  }, [dispatch]);

  useAutoHideNotification(submitSuccess, hideSuccess, 3000);

  return (
    <Box sx={{ width: "100%" }}>
      {submitSuccess && (
        <Box sx={{ width: "100%", minHeight: 50 }}>
          <AlertMessage
            severity='success'
            message='Сотрудник успешно добавлен!'
          />
        </Box>
      )}
      {loadError && (
        <Box sx={{ width: "100%", minHeight: 50 }}>
          <AlertMessage severity='error' message={loadError} />
        </Box>
      )}
    </Box>
  );
});
