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

export default function EventDetailsSidebar() {
  const following = true;
  const isHost = true;

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
        <Typography variant="h6">2 people going</Typography>
      </Paper>
      <Paper sx={{ padding: 2 }}>
        <Grid container alignItems="center">
          <Grid size={8}>
            <List sx={{ display: "flex", flexDirection: "column" }}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar alt={"attendee name"} src={"/assets/user.png"} />
                </ListItemAvatar>
                <ListItemText>
                  <Typography variant="h6">Bob</Typography>
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
            {isHost && (
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
            {following && (
              <Typography variant="body2" color="#FF8000">
                Following
              </Typography>
            )}
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
