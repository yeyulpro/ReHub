import {
  TextFieldProps,
  Select,
  SelectProps,
  FormControl,
  InputLabel,
  MenuItem,
  FormHelperText,
} from "@mui/material";

import { useController, UseControllerProps } from "react-hook-form";
import { FormSchemaType } from "../../../lib/schema/FormSchema";

type Props = {
  items: { text: string; value: string }[];
  label: string;
} & TextFieldProps &
  UseControllerProps<FormSchemaType, "category"> &
  SelectProps;

export default function CustomSelectInput(props: Props) {
  const { field, fieldState } = useController({ ...props });

  return (
    <FormControl fullWidth error={!!fieldState.error}>
      <InputLabel id={field.name}>{props.label}</InputLabel>
      <Select
        {...field}
        error={!!fieldState.error}
        value={field.value ?? ""}
        label={props.label}
        // onChange={field.onChange}
        labelId={field.name}
        onChange={(e) => field.onChange(e.target.value)}
      >
        {props.items.map((x) => (
          <MenuItem key={x.value} value={x.value}>
            {x.text}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{fieldState.error?.message}</FormHelperText>
    </FormControl>
  );
}
