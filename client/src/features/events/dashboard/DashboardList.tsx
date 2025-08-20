import { Box, Typography } from "@mui/material";
import EventCards from "./EventCards";
import { useEvents } from "../../../lib/hooks/useEvents";

export default function DashboardList() {
  const { events, isPending } = useEvents();

  if(!events || isPending) return <Typography>Loading...</Typography>

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {events?.map((evt) => (
        <EventCards key={evt.id} event={evt} />
      ))}
    </Box>
  );
}
