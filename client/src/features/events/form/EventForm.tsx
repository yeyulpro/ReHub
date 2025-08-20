import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useEvents } from "../../../lib/hooks/useEvents";
import { NavLink, useParams } from "react-router";
import { ChangeEvent, useEffect, useState } from "react";
import {  format } from "date-fns";

export default function EventForm() {
  const { id } = useParams();
  const { createEvent, updateEvent, event } = useEvents(id);

  const [formData, setFormData] = useState({ title: "", description: "", category: "", date: "", city: "", venue: "" });

  useEffect(() => {
    if (event) {
      
      const parsedDate=format(new Date(event.date),"yyyy-MM-dd" )
      setFormData(
        {
          
          title: event.title,
          description: event.description,
          category: event.category,
          date: parsedDate,
          city: event.city,
          venue: event.venue
        }
      )
    }
  }, [event])
  const handleChange=(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=> {
    
    const { name, value } = event.target;
     const updatedValue=value.charAt(0).toUpperCase()+value.slice(1);
    setFormData(prev => ({ ...prev, [name]: updatedValue }))
  }
 

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (event) {
        updateEvent.mutate({ ...formData, id: event.id });
      } else {
        createEvent.mutate(formData);
      }
    };

   
  return (
    <Paper sx={{ borderRadius: 1, padding: 3, mt: 3 }}>
      <Typography variant="h6" color="initial" sx={{ width: 400, mb: 3 }}>
        { event? "Edit Event" :"Create Event"}
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 3 }}
      >
        <TextField required name="title" value={formData.title} label="Title" onChange={handleChange} />
        <TextField required name="description" value={formData.description} multiline rows={4} label="Description" onChange={handleChange} />
        <TextField required name='category' value={formData.category} label="Category" onChange={handleChange} />
        <TextField required name="date" value={formData.date} type="Date" onChange={handleChange} />
        <TextField required name="city" value={formData.city} label="City" onChange={handleChange} />
        <TextField required name="venue" value={formData.venue} label="Venue" onChange={handleChange} />
        <Box sx={{ display: "flex", justifyContent: "end", gap: 3 }}>
          <Button color="inherit" component={NavLink} to='/events' >Cancel</Button>
          <Button type="submit" color="success" variant="contained" >
            {event? 'Edit':'Create'}
          </Button>

        </Box>
      </Box>
    </Paper>
  );
}
