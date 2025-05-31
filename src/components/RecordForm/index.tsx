import { memo, useCallback } from "react";
import { Box, TextField, Button, Typography, Grid } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { formFields } from "../../constants/fields";
import { useSelector } from "react-redux";
import { AlertMessage } from "../AlertMessage";
import { selectRecordsState, submitNewRecord } from "../../store/records";
import { useValidationRules } from "../../hooks/useValidationRules";

type FormData = Record<string, string>;

export const RecordForm = memo(({ onClose }: { onClose: () => void }) => {
  const dispatch = useAppDispatch();
  const { submitError, isSubmitting } = useSelector(selectRecordsState);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<FormData>({
    mode: "onChange",
    defaultValues: formFields.reduce((acc, field) => {
      acc[field.key] = "";
      return acc;
    }, {} as Record<string, string>),
  });

  const onSubmit = useCallback(
    async (data: FormData) => {
      const normalizedData = Object.entries(data).reduce(
        (acc, [key, value]) => {
          acc[key] = typeof value === "string" ? value.trim() : value;
          return acc;
        },
        {} as Record<string, string>
      );

      const resultAction = await dispatch(submitNewRecord(normalizedData));
      if (submitNewRecord.fulfilled.match(resultAction)) {
        reset();
        onClose();
      }
    },
    [dispatch, onClose, reset]
  );

  return (
    <Box
      component='form'
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{ mb: 4 }}
    >
      <Typography variant='h6' gutterBottom>
        Заполните анкету сотрудника
      </Typography>

      <Box sx={{ position: "relative", minHeight: 25, mb: 3 }}>
        {submitError && (
          <Box sx={{ position: "absolute", width: "100%" }}>
            <AlertMessage severity='error' message={submitError} />
          </Box>
        )}
      </Box>

      <Grid container spacing={2}>
        {formFields.map((formField) => {
          const rules = useValidationRules(formField);

          return (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={formField.key}>
              <Controller
                name={formField.key}
                control={control}
                rules={rules}
                render={({ field: controllerField }) => (
                  <TextField
                    {...controllerField}
                    label={formField.label}
                    fullWidth
                    margin='normal'
                    error={!!errors[controllerField.name]}
                    helperText={errors[controllerField.name]?.message || ""}
                    onChange={(e) => {
                      let value = e.target.value;

                      if (
                        formField.validateAs === "email" ||
                        formField.validateAs === "text"
                      ) {
                        value = value.trimStart();
                      }

                      controllerField.onChange(value);
                    }}
                    slotProps={{
                      inputLabel: { shrink: true },
                    }}
                  />
                )}
              />
            </Grid>
          );
        })}
      </Grid>

      <Box sx={{ display: "flex", gap: 2, mt: 3, flexWrap: "wrap" }}>
        <Button
          type='submit'
          variant='contained'
          color='primary'
          disabled={!isDirty || !isValid || isSubmitting}
          sx={{
            fontWeight: "bold",
            textTransform: "none",
            boxShadow: 3,
            "&:hover": { boxShadow: 5 },
          }}
        >
          Добавить
        </Button>

        <Button
          variant='outlined'
          color='secondary'
          onClick={onClose}
          sx={{
            fontWeight: "medium",
            textTransform: "none",
            borderColor: "action.disabled",
            color: "text.primary",
            "&:hover": {
              borderColor: "text.secondary",
              backgroundColor: "action.hover",
            },
          }}
        >
          Отменить
        </Button>
      </Box>
    </Box>
  );
});
