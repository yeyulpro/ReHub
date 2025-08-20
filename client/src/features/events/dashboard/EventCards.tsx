import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";
import { Hub_Event } from "../../../lib/types";

import { Link, } from "react-router";
import { useEvents } from "../../../lib/hooks/useEvents";

type Props = {
  event: Hub_Event;
};

export default function EventCards({ event }: Props) {

  const { deleteEvent, isPending } = useEvents();


  return (
    <Card sx={{ width: "100%", display: "flex", pb: 0 }}>
      <CardContent sx={{ width: "100%" }}>
        <Typography gutterBottom variant="h5" component="div">
          {event.title}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {event.title}
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          {event.title}
        </Typography>
        <CardActions sx={{ display: "flex", justifyContent: "space-between" ,textTransform:'capitalize'}}>
          <Chip variant="outlined" label={event.category}></Chip>
          <Box>
            <Button
              size="medium"
              onClick={() => {
                if (event.id) deleteEvent.mutate(event.id);
              }}
              disabled={isPending}
            >
              Delete
            </Button>
            <Button size="medium" component={Link} to={`/events/${event.id}`} >
              View
            </Button>
          </Box>
        </CardActions>
      </CardContent>
    </Card>
  );
}
