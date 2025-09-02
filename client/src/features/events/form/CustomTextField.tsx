import { TextField, TextFieldProps } from "@mui/material";

import { FieldValues, useController, UseControllerProps } from "react-hook-form";


type Props<T extends FieldValues> ={}& TextFieldProps & UseControllerProps<T>;

export default function CustomTextField<T extends FieldValues>(props: Props<T>) {
  const { field, fieldState } = useController({ ...props });

  return (
    <TextField
      {...props}
      {...field}
      value={field.value ||""}
      helperText={fieldState.error?.message}
      error={!!fieldState.error}
    />
  );
}
