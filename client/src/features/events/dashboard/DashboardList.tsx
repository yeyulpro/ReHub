import { Box, Typography } from "@mui/material";
import EventCards from "./EventCards";
import { useEvents } from "../../../lib/hooks/useEvents";
import { Fragment } from "react/jsx-runtime";
import { observer } from "mobx-react-lite";

const EventList=observer( function DashboardList() {
  const { eventsGroup, isLoading } = useEvents();

  if (isLoading) return <Typography>Loading...</Typography>;
  if (!eventsGroup) return <Typography>No event found.</Typography>;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {eventsGroup?.pages.map((events, index) => (
        <Fragment key={index}>
          {events?.items.map((evt) => (
            <EventCards key={evt.id} event={evt} />
          ))}
        </Fragment>
      ))}
    </Box>
  );
})
export default EventList
