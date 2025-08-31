import {
  DateTimePicker,DateTimePickerProps,
} from "@mui/x-date-pickers/DateTimePicker";
import { UseControllerProps, useController } from "react-hook-form";
import { FormSchemaType } from "../../../lib/schema/FormSchema";

type Props = DateTimePickerProps & UseControllerProps<FormSchemaType, "date">;

export default function CustomDateTimeInput(props: Props) {
  const { field, fieldState } = useController({ ...props });
  return (
    <DateTimePicker
      {...props}
      {...field}
      value={field.value? new Date(field.value): null}
      onChange={value => {           // value is not string, but Date type.
        field.onChange(new Date(value!));
      }}
      sx={{ width: "100%" }}
      slotProps={{
        textField: {
          onBlur: field.onBlur,
          error: !!fieldState.error,
          helperText: fieldState.error?.message,
        },
      }}
    />
  );
}
