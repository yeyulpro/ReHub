import {
  Box,
  Tabs,
  Tab,
  Typography,
  Card,
  CardMedia,
  Grid,
  CardContent,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import { useState, useEffect, SyntheticEvent } from "react";
import { useParams, Link } from "react-router";
import { useProfile } from "../../lib/hooks/useprofile";
import { Hub_Event } from "../../lib/types";
import { format } from "date-fns";

export default function ProfileEvents() {
  const [eventTab, setEventTab] = useState(0);
  const { id } = useParams();
  const { userEvents, setFilter, LoadingUserEvent } = useProfile(id);
  useEffect(() => {
    setFilter("future");
  }, [setFilter]);

  const tabs = [
    { menuItem: "Future Events", key: "future" },
    { menuItem: "Past Events", key: "past" },
    { menuItem: "Hosting", key: "hosting" },
  ];
  const handleTabChange = (_: SyntheticEvent, newValue: number) => {
    setEventTab(newValue);
    setFilter(tabs[newValue].key);
  };
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid size={12}>
          <Tabs value={eventTab} onChange={handleTabChange}>
            {tabs.map((tab, index) => (
              <Tab label={tab.menuItem} key={index} />
            ))}
          </Tabs>
        </Grid>
      </Grid>
      {(!userEvents || userEvents.length === 0) && !LoadingUserEvent ? (
        <Typography mt={2}>No Event to show</Typography>
      ) : null}
      <Grid
        container
        spacing={2}
        sx={{ marginTop: 2, height: 400, overflow: "auto" }}
      >
        {userEvents &&
          userEvents.map((event: Hub_Event) => (
            <Grid size={2} key={event.id}>
              <Link
                to={`/events/${event.id}`}
                style={{ textDecoration: "none" }}
              >
                <Card elevation={4}>
                  <CardMedia
                    component="img"
                    height="100"
                    image={`/images/${event.category}.jpg`}
                    alt={event.title}
                    sx={{ objectFit: "cover" }}
                  />
                  <CardContent>
                    <Typography variant="body1" color="initial">
                      {event.title}
                    </Typography>
                    <Divider />
                    <Typography variant="body2" color="initial">
                      <span>{format(event.date, "do LLL yyyy")}</span>
                      <span>{format(event.date, "h:mm a")}</span>
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
}
