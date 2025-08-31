import { Card, CardMedia, Box, Typography, Button, Chip } from "@mui/material";
import { NavLink } from "react-router";
import { format } from "date-fns";
import { Hub_Event } from "../../../lib/types";

type Props = {
  event: Hub_Event;
};
export default function EventDetailHeader({ event }: Props) {
  const isCancelled = false;
  const isHost = true;
  const isGoing = false;

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
        {isCancelled ? (
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
            justifyContent: "space-between",
            position: "absolute",
            height: "100px",
            top: "500px",
            background:
              "linear-Gradient(to top, rgba(0,0,0,1),70%,transparent)",
            width: "100%",
          }}
        >
          <Box>
            <Typography variant="h5" sx={{ color: "#FFFF", pl: 2 }}>
              {event.title}
            </Typography>
            <Typography variant="subtitle1" sx={{ color: "#FFFF", pl: 2 }}>
              {format(eventDate, "yyyy-MM-dd HH:mm")}
            </Typography>
            <Typography variant="subtitle2" sx={{ color: "#FFFF", pl: 2 }}>
              Hosted by Bob
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
            {isHost ? (
              isCancelled ? (
                <Button
                  onClick={() => {}}
                  size="large"
                  sx={{
                    color: "#ee4832ff",
                    fontSize: "large",
                    fontWeight: "bolder",
                  }}
                >
                  Reactivate
                </Button>
              ) : (
                <>
                  <Button
                    onClick={() => {}}
                    size="large"
                    sx={{
                      color: "#ee4832ff",
                      fontSize: "large",
                      fontWeight: "bolder",
                    }}
                  >
                    Cancel Event
                  </Button>
                  <Button
                    component={NavLink}
                    to={`/manage/${event.id}`}
                    size="large"
                    sx={{
                      color: "#c2bcf0ff",
                      fontSize: "large",
                      fontWeight: "bolder",
                    }}
                  >
                    Manage Event
                  </Button>
                </>
              )
            ) : (
              !isCancelled &&
              (isGoing ? (
                <Button
                  size="large"
                  sx={{
                    color: "#c2bcf0ff",
                    fontSize: "large",
                    fontWeight: "bolder",
                  }}
                >
                  Cancel going
                </Button>
              ) : (
                <Button
                  size="large"
                  sx={{
                    color: "#c2bcf0ff",
                    fontSize: "large",
                    fontWeight: "bolder",
                  }}
                >
                  attend request
                </Button>
              ))
            )}
          </Box>
        </Box>
      </Card>
    </>
  );
}
