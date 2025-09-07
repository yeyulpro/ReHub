import { Card, CardMedia, Box, Typography, Button, Chip } from "@mui/material";
import { Link } from "react-router";
import { format } from "date-fns";
import { Hub_Event } from "../../../lib/types";
import { useEvents } from "../../../lib/hooks/useEvents";

type Props = {
  event: Hub_Event;
};
export default function EventDetailHeader({ event }: Props) {
  const { updateAttendance } = useEvents(event.id);
  const eventDate =
    event.date instanceof Date ? event.date : new Date(event.date);

  return (
    <>
      <Card sx={{ position: "relative", height: 600 }} elevation={8}>
        <CardMedia
          component="img"
          alt="green iguana"
          image={`/images/${event.category.toLowerCase()}.jpg`}
        />
        {event.isCancelled ? (
          <Chip
            sx={{ position: "absolute", left: 40, top: 20, zIndex: 1000 }}
            color="error"
            label="Cancelled"
          />
        ) : (
          <Chip
            sx={{
              position: "absolute",
              left: 40,
              top: 20,
              zIndex: 1000,
              fontWeight: "bolder",
              color: "#FFFF",
              backgroundColor: "#0079FF",
            }}
            label="Ongoing"
          />
        )}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "absolute",
            height: "100px",
            top: "500px",
            background:
              "linear-Gradient(to top, rgba(0,0,0,1),70%,transparent)",
            width: "100%",
          }}
        >
          <Box sx={{ color: "#FFFF", pl: 2 }}>
            <Typography variant="h5">{event.title}</Typography>
            <Typography variant="subtitle1">
              {format(eventDate, "yyyy-MM-dd HH:mm")}
            </Typography>
            <Typography variant="subtitle2">
              Hosted by{" "}
              <Link
                to={`profiles/${event.hostId}`}
                style={{
                  color: "#FFFF",
                  textDecoration: "none",
                  fontSize: "1.2rem",
                }}
              >
                {event.hostDisplayName}
              </Link>
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "2",
              pr: 2,
            }}
          >
            {event.isHost ? (
              <>
                <Button
                  sx={{
                    bgcolor: "#0683f7ff",
                    color: "#FFFF00",
                    height: 40,
                    mr: 2,
                  }}
                  onClick={() => {
                    updateAttendance.mutate(event.id);
                  }}
                >
                  {event.isCancelled
                    ? "Re-activate the Event"
                    : "Cancel the Event"}
                </Button>
                <Button
                  disabled={event.isCancelled}
                  sx={{ bgcolor: "#ff7a2dff", color: "#FFFF00", height: 40 }}
                >
                  Manage the Event
                </Button>
              </>
            ) : (
              !event.isCancelled && (
                <Button
                  onClick={() => updateAttendance.mutate(event.id)}
                  sx={{
                    bgcolor: "#0683f7ff",
                    color: event.isGoing ? "#FFFF" : "#FFFF00",
                    height: 40,
                  }}
                >
                  {event.isGoing ? "Cancel Attendance" : "Attend the Event"}
                </Button>
              )
            )}
          </Box>
        </Box>
      </Card>
    </>
  );
}
