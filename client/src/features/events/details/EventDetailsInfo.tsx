import { CalendarToday, Info, Place } from "@mui/icons-material";
import { Box, Button, Divider, Grid, Paper, Typography } from "@mui/material";
import { Hub_Event } from "../../../lib/types";
import MapComponent from "./MapComponent";
import { useState } from "react";
// import { set } from "zod";

type Props = {
  event: Hub_Event;
};
export default function EventDetailsInfo({ event }: Props) {
  const [isMapOpen, setIsMapOpen] = useState(false);
  return (
    <Paper sx={{ mb: 2 }}>
      <Grid container alignItems="center" pl={2} py={1}>
        <Grid size={1}>
          <Info color="info" fontSize="large" />
        </Grid>
        <Grid size={11}>
          <Typography>{event.description}</Typography>
        </Grid>
      </Grid>
      <Divider />
      <Grid container alignItems="center" pl={2} py={1}>
        <Grid size={1}>
          <CalendarToday color="info" fontSize="large" />
        </Grid>
        <Grid size={11}>
          <Typography>{new Date(event.date).toLocaleString()}</Typography>
        </Grid>
      </Grid>
      <Divider />

      <Grid container alignItems="center" pl={2} py={1}>
        <Grid size={1}>
          <Place color="info" fontSize="large" />
        </Grid>
        <Grid size={11} spacing={2} display='flex' justifyContent={'space-between'}>
          <Typography>
            {" "}
            {event.venue} {event.city}{" "}
          </Typography>
          <Button
            onClick={() => setIsMapOpen(!isMapOpen)}
          >
            {isMapOpen ? "Map Close" : "Map Open"}
          </Button>
        </Grid>       
      </Grid>
      <Box>
        {isMapOpen && (
          <Box sx={{ height: 400, zIdex: 1000, display: "block" }}>
            <MapComponent
              position={[event.latitude, event.longitude]}
              venue={event.venue}
            />
          </Box>
        )}
      </Box>
    </Paper>
  );
}
