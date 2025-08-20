import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Typography,
} from "@mui/material";
import { Link, useNavigate, useParams } from "react-router";
import { useEvents } from "../../../lib/hooks/useEvents";
import { format } from "date-fns";

export default function EventDetail() {
  const navigate = useNavigate();
  const {id} = useParams();
  const {event, isLoadingEvent} = useEvents(id);
 

  if (isLoadingEvent) return  <Typography> Loading...</Typography>

  if(!event) return <Typography> Event not found</Typography>

  return (
    <Card>
      <CardMedia
        sx={{ height: 500 }}
        image={`/images/${event.category}.jpg`}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {event.title}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {format(new Date(event.date),  "yyyy-MM-dd HH:mm")}
          <Divider />
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" component={Link} to={`/manage/${event.id}`}>
          Edit
        </Button>
        <Button size="medium" onClick={() => navigate("events")}>
          Cancel
        </Button>
      </CardActions>
    </Card>
  );
}
