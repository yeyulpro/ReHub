import { TextField, TextFieldProps } from "@mui/material";

import { useController, UseControllerProps } from "react-hook-form";
import { FormSchemaType } from "../../../lib/schema/FormSchema";

type Props = TextFieldProps & UseControllerProps<FormSchemaType>;

export default function CustomTextField(props: Props) {
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
