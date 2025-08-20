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
        <AppBar position="static" sx={{ backgroundColor: "#FEFEFE" }}>
          <Toolbar sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexGrow: 1,
              }}
            >
              <RoofingIcon sx={{ color: "#555555", mr: 2, fontSize: "3rem" }} />
              <Typography
                variant="h4"
                component={NavLink}
                to="/"
                sx={{ color: "#555555", mr: 2, textDecoration: "none" }}
              >
                ReHub
              </Typography>
              <Typography
                variant="h6"
                component={NavLink}
                to="/"
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
                <Button
                  size="large"
                  sx={{ color: "#555555", fontSize: "1.1rem" }}
                  component={NavLink} to={'/createEvent'}
                >
                  Create Event
                </Button>
                <Button
                  size="large"
                  sx={{ color: "#555555", fontSize: "1.1rem" }}
                >
                  Login
                </Button>
              </MenuItem>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
