import {
  Box,
  Divider,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Typography,
} from "@mui/material";

import FilterAltIcon from "@mui/icons-material/FilterAlt";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useStore } from "../../../lib/hooks/useStore";
import { observer } from "mobx-react-lite";
const EventFilters = observer(function DashboardFilter() {
  const {
    eventStore: { setFilter, setStartDate, filter, startDate },
  } = useStore();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        color: "primary.main",
      }}
    >
      <Paper elevation={3} sx={{ padding: 3, borderRadius: 3 }}>
        <Box
          color="primary.main"
          sx={{
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
            bgcolor: "#FFFF",
            borderRadius: 3,
            gap: 1,
          }}
        >
          <FilterAltIcon />
          <Typography variant="h6">Filters</Typography>
        </Box>
        <MenuList>
          <MenuItem
            selected={filter === "all"}
            onClick={() => setFilter("all")}
          >
            <ListItemText primary="All Events" />
          </MenuItem>
          <MenuItem
            selected={filter === "isGoing"}
            onClick={() => setFilter("isGoing")}
          >
            <ListItemText primary="I am going" />
          </MenuItem>
          <MenuItem
            selected={filter === "isHost"}
            onClick={() => setFilter("isHost")}
          >
            <ListItemText primary="I am hosting" />
          </MenuItem>
        </MenuList>
      </Paper>
      <Box sx={{ borderRadius: 3 }}>
        <Paper
          elevation={3}
          color="primary.main"
          sx={{ borderRadius: 3, overflow: "hidden" }}
        >
          <Box sx={{ textAlign: "center", p: 2 }}>
            <Typography
              variant="h6"
              color="primary.main"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <EditCalendarIcon />
              Select Date
            </Typography>
            <Divider />
            <Calendar
              value={startDate}
              onChange={(date) => setStartDate(date as Date)}
            />
          </Box>
        </Paper>
      </Box>
    </Box>
  );
});
export default EventFilters;
