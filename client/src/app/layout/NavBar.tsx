import {
  AppBar,
  Box,
  Button,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import RoofingIcon from "@mui/icons-material/Roofing";
import { NavLink } from "react-router";
import MenuItemLink from "../shared/components/MenuItemLink";

export default function NavBar() {
  return (
    <>
      <Box>
        <AppBar position="static" sx={{ backgroundColor: "#FEFEFE"  }}>
          <Toolbar sx={{ display: "flex", gap: 3, flexWrap: "wrap"}}>
            <Box
              component={NavLink}
              to="/events"
              sx={{
                display: "flex",
                alignItems: "center",
                flexGrow: 1,
                textDecoration: "none",
              }}
            >
              <RoofingIcon sx={{ color: "#555555", mr: 2, fontSize: "3rem" }} />
              <Typography
                variant="h4"
                sx={{ color: "#555555", mr: 2, textDecoration: "none" }}
              >
                ReHub
              </Typography>
              <Typography
                variant="h6"
                component={NavLink}
                to="/events"
                sx={{ color: "#555555", textDecoration: "none" }}
              >
                A Real Estate Hub for events, learning, and networking
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 6 }}>
              <MenuItemLink to="/events">Events</MenuItemLink>
              <MenuItemLink to="/createEvent">Create Events</MenuItemLink>
            </Box>
            <Box>
              <MenuItem>
                <Button size="medium" sx={{ color: "#555555" }}>
                  user menu
                </Button>
              </MenuItem>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
