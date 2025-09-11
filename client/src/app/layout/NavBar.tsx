import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import RoofingIcon from "@mui/icons-material/Roofing";
import { Link, NavLink } from "react-router";
import MenuItemLink from "../shared/components/MenuItemLink";
import WavingHandOutlinedIcon from "@mui/icons-material/WavingHandOutlined";
import { useAccount } from "../../lib/hooks/useAccount";
import UserMenu from "./UserMenu";

export default function NavBar() {
  const { currentUser } = useAccount();

  return (
    <>
      <Box>
        <AppBar position="static" sx={{ backgroundColor: "#FEFEFE" }}>
          <Toolbar
            sx={{
              display: "flex",
              gap: 3,
              flexWrap: "wrap",
              justifyContent: "space-around",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexGrow: 1,
                textDecoration: "none",
              }}
            >
              <Box component={NavLink} to="/">
                <RoofingIcon
                  sx={{ color: "#555555", mr: 2, fontSize: "3rem" }}
                />
              </Box>
              <Typography
                variant="h4"
                sx={{ color: "#555555", mr: 2, textDecoration: "none" }}
                component={NavLink}
                to="/events"
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
            <Box
              sx={{
                textTransform: "uppercase",
                display: "flex",
                gap: 6,
                justifyContent: "flex-end",
                alignItems: "center",
                color: "#555555",
                flexGrow: 1,
                fontWeight: "bold",
              }}
            >
              <MenuItemLink to="/events">All Events</MenuItemLink>

              {currentUser ? (
                <>
                  <Typography
                    sx={{ fontWeight: 500, textDecoration: "none" }}
                    component={Link}
                    to={`profile/${currentUser.id}`}
                  >
                    Hello <WavingHandOutlinedIcon /> {currentUser.displayName}
                  </Typography>
                  <UserMenu />
                </>
              ) : (
                <Box sx={{ display: "flex", gap: 3, mr: 3 }}>
                  <MenuItemLink to="/register">Register</MenuItemLink>
                  <MenuItemLink to="/login">Login</MenuItemLink>
                </Box>
              )}
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
