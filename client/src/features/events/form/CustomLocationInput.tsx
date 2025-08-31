import {
  Box,
  debounce,
  List,
  ListItemButton,
  ListItemButtonProps,
  ListProps,
  TextField,
  TextFieldProps,
  Typography,
} from "@mui/material";
import { useController, UseControllerProps } from "react-hook-form";
import { FormSchemaType } from "../../../lib/schema/FormSchema";
import { useEffect, useMemo, useState } from "react";
import { LocationIQSuggestion } from "../../../lib/types";
import axios from "axios";


type Props = TextFieldProps &
  UseControllerProps<FormSchemaType> &
  ListProps &
  ListItemButtonProps;

export default function CustomLocationInput(props: Props) {
  const { field, fieldState } = useController({ ...props });
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<LocationIQSuggestion[]>([]);
  const [inputValue, setInputValue] = useState(field.value || "")
         

  useEffect(() => {
    if (field.value && typeof field.value === "object" && !(field.value instanceof Date)) {
      setInputValue(field.value.venue || "");
    } else {
      setInputValue(field.value || "");
    }
  }, [field.value]);

  const locationURL =
    "https://api.locationiq.com/v1/autocomplete?key=pk.a34e0b9aa2ff9695e5a9f43b03d9ea8c&limit=5&dedupe=1&";

  const fetchSuggestions = useMemo(
    () =>
      debounce(async (query: string) => {
        if (!query || query.length < 3) {
          setSuggestions([]);
          return;
        }
        setLoading(true);
        try {
          const res = await axios.get<LocationIQSuggestion[]>(
            `${locationURL}q=${query}`
          );
          setSuggestions(res.data);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      }, 500),
    [locationURL]
  );
  const handleChange = async (value: string) => {
       setInputValue(value);
  
  field.onChange({
    venue: value,
    city: "",
    latitude: 0,
    longitude: 0,
  });
  fetchSuggestions(value);
  };

  const handleSelect = (location: LocationIQSuggestion) => {
    const city =
      location.address.city ||
      location.address.town ||
      location.address.village;
    const venue = location.display_name;
    const latitude = location.lat;
    const longitude = location.lon;
  
    setInputValue(venue);
    field.onChange({ city, venue, latitude, longitude });
  };

  return (
    <Box>
      <TextField
        {...props}
        value={inputValue}
        fullWidth
        onChange={(e) => handleChange(e.target.value)}
        error={!!fieldState.error}
        helperText={fieldState.error?.message}
      />
      {loading && <Typography>Loading...</Typography>}
      {suggestions.length > 0 && (
        <List sx={{ border: 1 }}>
          {suggestions.map((suggestion) => (
            <ListItemButton
              divider
              key={suggestion.place_id}
              onClick={() => handleSelect(suggestion)}
            >
              {suggestion.display_name}
            </ListItemButton>
          ))}
        </List>
      )}
    </Box>
  );
}
