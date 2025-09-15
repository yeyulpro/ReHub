import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Typography,
} from "@mui/material";
import { Hub_Event } from "../../../lib/types";
import { Link } from "react-router";
import { useEvents } from "../../../lib/hooks/useEvents";
import Avatar from "@mui/material/Avatar";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PlaceIcon from "@mui/icons-material/Place";

import AvatarPopover from "../../profiles/AvatarPopover";

type Props = {
  event: Hub_Event;
};

export default function EventCards({ event }: Props) {
  const { deleteEvent, isLoading } = useEvents();

  return (
    <Card
      sx={{ width: "100%", borderRadius: 3, margin: 0, bgcolor: "#FFFFFF" }}
    >
      <CardContent sx={{ width: "100%", pl: 0, pr: 0 }}>
        <Box
          sx={{
            mx: 0,
            display: "flex",
            gap: 3,
            px: 2,
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{ display: "flex", gap: 3, pl: 1, justifyContent: "center" }}
          >
            <Avatar alt="Remy Sharp" src={event.hostImageUrl} />
            <Box>
              <Typography
                gutterBottom
                variant="body1"
                sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
              >
                {event.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", textDecoration: "none" }}
                component={Link}
                to={`/profile/${event.hostId}`}
              >
                Hosted By{" "}
                <span style={{ color: "#444444", fontWeight: "bold" }}>
                  {event.hostDisplayName}
                </span>
              </Typography>
            </Box>
          </Box>

          <Chip
            variant="outlined"
            label={
              event.isHost ? "Host" : event.isGoing ? "Going" : "Not going"
            }
            sx={{
              textTransform: "uppercase",
              borderRadius: 1,
              fontWeight: "bold",
              borderColor: "#666666",
              borderWidth: 2,
            }}
          />
        </Box>
        <Divider />
        <Box
          sx={{
            display: "flex",
            gap: 4,
            paddingTop: 2,
            paddingBottom: 2,
            pl: 3,
          }}
        >
          <Box sx={{ display: "flex", gap: 1 }}>
            <AccessTimeIcon />
            <Box>
              <Typography variant="body2">
                {new Date(event.date).toLocaleString()}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex", gap: 1 }}>
            <PlaceIcon />
            <Box>
              <Typography variant="body2">{event.venue}</Typography>
            </Box>
          </Box>
        </Box>
        <Divider />

        <Box
          sx={{
            display: "flex",
            gap: 3,
            bgcolor: "#C0C0C0",
            color: "text.secondary",
            padding: 3,
          }}
        >
          {event.attendees.map((attendee) => (
            <AvatarPopover key={attendee.id} profile={attendee} />
          ))}
        </Box>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            pt: 2,
            pl: 3,
          }}
        >
          <Chip
            variant="outlined"
            label={event.category}
            sx={{
              border: `2px solid ${
                event.category === "legal"
                  ? "#0E49B5"
                  : event.category === "investment"
                  ? "#FDB827"
                  : event.category === "education"
                  ? "#08CB00"
                  : event.category === "news"
                  ? "#F97A00"
                  : "#EA2264"
              }`,
            }}
          />
          <Box>
            <Button
              size="medium"
              onClick={() => {
                if (event.id) deleteEvent.mutate(event.id);
              }}
              disabled={isLoading}
              variant="contained"
              color="error"
              sx={{ mr: 1, width: 11, p: 0.5 }}
            >
              Delete
            </Button>
            <Button
              size="medium"
              variant="contained"
              component={Link}
              to={`/events/${event.id}`}
              sx={{ mr: 2, width: 11, p: 0.5 }}
            >
              View
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
