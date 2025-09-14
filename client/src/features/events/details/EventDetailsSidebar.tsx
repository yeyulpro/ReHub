import {
  Paper,
  Typography,
  List,
  ListItem,
  Chip,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Grid,
} from "@mui/material";
import { Hub_Event } from "../../../lib/types";
type Props = {
  event: Hub_Event;
};
export default function EventDetailsSidebar({ event }: Props) {
  return (
    <>
      <Paper
        sx={{
          textAlign: "center",
          border: "none",
          backgroundColor: "#383737ff",
          color: "white",
          p: 2,
        }}
      >
        <Typography variant="h6">
          {event.attendees.length} people going
        </Typography>
      </Paper>
      <Paper sx={{ padding: 2 }}>
        {event.attendees?.map((attendee) => (
          <Grid container alignItems="center" key={attendee.id}>
            <Grid size={8}>
              <List sx={{ display: "flex", flexDirection: "column" }}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar
                      alt={`${attendee.displayName} image`}
                      src={attendee.imageUrl}
                    />
                  </ListItemAvatar>
                  <ListItemText>
                    <Typography variant="h6">{attendee.displayName}</Typography>
                    {attendee.following && (
                      <Typography variant="body2" color="#FF8000">
                        Following
                      </Typography>
                    )}
                  </ListItemText>
                </ListItem>
              </List>
            </Grid>
            <Grid
              size={4}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: 1,
              }}
            >
              {attendee.id == event.hostId && (
                <Chip
                  label="Host"
                  variant="filled"
                  sx={{
                    borderRadius: 2,
                    backgroundColor: "#FF5E20",
                    color: "#FFFF",
                  }}
                />
              )}
            </Grid>
          </Grid>
        ))}
      </Paper>
    </>
  );
}
