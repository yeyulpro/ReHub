import { CalendarToday, Info, Place } from "@mui/icons-material";
import { Divider, Grid, Paper, Typography } from "@mui/material";
import { Hub_Event } from "../../../lib/types";

type Props = {
  event: Hub_Event;
};
export default function EventDetailsInfo({ event }: Props) {

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
        <Grid size={11} spacing={2}>
          <Typography>{event.venue}  { event.city}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}
