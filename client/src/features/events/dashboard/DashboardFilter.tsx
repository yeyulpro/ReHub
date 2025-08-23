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
export default function DashboardFilter() {
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
          <MenuItem>
            <ListItemText primary="All Events" />
          </MenuItem>
          <MenuItem>
            <ListItemText primary="I am going" />
          </MenuItem>
          <MenuItem>
            <ListItemText primary="I am hosting" />
          </MenuItem>
        </MenuList>
      </Paper>
      <Box sx={{borderRadius:3}}>
        <Paper elevation={3} color="primary.main"  sx={{borderRadius: 3, overflow: "hidden"  }}>
          <Box sx={{  textAlign: "center", p: 2 }}>
            <Typography variant="h6" color="primary.main" sx={{display:'flex', alignItems:'center'}}>
              <EditCalendarIcon />
              Select Date
            </Typography>
            <Divider />
            <Calendar />
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
