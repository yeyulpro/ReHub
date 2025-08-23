import { Grid, Typography } from "@mui/material";
import EventDetailsHeader from "./EventDetailsHeader";
import EventDetailsInfo from "./EventDetailsInfo";
import EventDetailsSidebar from "./EventDetailsSidebar";
import EventDetailsChat from "./EventDetailsChat";
import { useEvents } from "../../../lib/hooks/useEvents";
import { useParams } from "react-router";

export default function EventDetailPage() {
  const { id } = useParams();
  const { event, isLoadingEvent } = useEvents(id);
  if (isLoadingEvent) return <Typography> Loading...</Typography>;
  if (!event) return <Typography> Event not found</Typography>;

  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 8 }}>
        <EventDetailsHeader event={event} />
        <EventDetailsInfo event={event} />
        <EventDetailsChat event={event} />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <EventDetailsSidebar />
      </Grid>
    </Grid>
  );
}
