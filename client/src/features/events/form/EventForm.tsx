import { Box, Button, Paper, Typography } from "@mui/material";
import { Resolver, useForm } from "react-hook-form";
import { NavLink, useParams } from "react-router";
import { formSchema, FormSchemaType } from "../../../lib/schema/FormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomTextField from "./CustomTextField";
import CustomSelectInput from "./CustomSelectInput";
import { categoryItems } from "./categoryItems";
import CustomDateTimeInput from "./CustomDateTimeInput";
import CustomLocationInput from "./CustomLocationInput";
import { useEvents } from "../../../lib/hooks/useEvents";
import { useEffect } from "react";
import { Hub_Event } from "../../../lib/types";

export default function EventForm() {
  const { id } = useParams();
  // const navigate = useNavigate();
  const { event, updateEvent, createEvent } = useEvents(id);

  const { control, reset, handleSubmit } = useForm<FormSchemaType>({
    mode: "onSubmit",
    resolver: zodResolver(formSchema) as Resolver<FormSchemaType>,
    defaultValues: {},
  });
  useEffect(() => {
    if (event) {
      const eventDate =
        event.date instanceof Date ? event.date : new Date(event.date);
      reset({
        title: event.title,
        date: eventDate,
        description: event.description,
        category: event.category,
        location: {
          city: event.city ??"",
          venue: event.venue,
          latitude: event.latitude,
          longitude: event.longitude,
        },
      });
    }
  }, [reset, event]);

  const onSubmit = async (data: FormSchemaType) => {
    const { location,  ...rest } = data;
     if (!location || typeof location !== "object") {
    console.error("Location must be an object!");
    return;
  }
       const flattenData = {
      ...rest,
      ...location,
      city: location.city ?? "",
      venue: location.venue ?? "",
      latitude: location.latitude ?? 0,
      longitude: location.longitude ?? 0,
      category: rest.category.toLowerCase(), 
      date:
        rest.date instanceof Date
          ? rest.date.toISOString()
          : new Date(rest.date).toISOString(), 
    };
    try {
      if (event) {
         updateEvent.mutate(flattenData as unknown as Hub_Event);
        // updateEvent.mutate({
        //   ...event,
        //   ...flattenData,
        //   date: rest.date.toISOString(),
        // } as unknown as Hub_Event);
      } else {
         createEvent.mutate(flattenData as unknown as Hub_Event);
        // const formattedCategory =
        //   flattenData.category.charAt(0).toUpperCase() +
        //   flattenData.category.slice(1).toLowerCase();

        // createEvent.mutate({
        //   ...flattenData,
        //   category: formattedCategory,
        //   date:
        //     rest.date instanceof Date
        //       ? rest.date.toISOString()
        //       : new Date(rest.date).toISOString(),
        // } as unknown as Hub_Event);
      }
    } catch (error) {
      console.log(error + "terrible!!!");
    }
  };
  const onError = (errors: unknown) => {
    console.error("❌ Validation Errors", errors);
  };

  return (
    <Paper sx={{ borderRadius: 1, padding: 3, mt: 3 }}>
      <Typography
        variant="h6"
        color="initial"
        sx={{ width: 400, mb: 3 }}
      ></Typography>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column", gap: 3 }}
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <CustomTextField name="title" control={control} label="Title" />
        <CustomTextField
          name="description"
          control={control}
          multiline
          rows={4}
          label="Description"
        />
        <Box sx={{ display: "flex", gap: 3 }}>
          <CustomSelectInput
            items={categoryItems}
            name="category"
            control={control}
            label="Category"
          />
          <CustomDateTimeInput name="date" control={control} label="Date" />
        </Box>

        <CustomLocationInput
          name="location"
          control={control}
          label="Enter the Location"
        />

        <Box sx={{ display: "flex", justifyContent: "end", gap: 3 }}>
          <Button color="inherit" component={NavLink} to="/events">
            Cancel
          </Button>
          <Button type="submit" color="success" variant="contained">
            {event ? "Edit" : "Create"}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
