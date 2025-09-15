import { AppBar, Box, Toolbar, Typography, Stack } from "@mui/material";
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
        <AppBar position="fixed" sx={{ backgroundColor: "#2C3E50" }}>
          <Toolbar
            sx={{
              height: 100,
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
                  sx={{
                    fontWeight: "bold",
                    fontSize: "3.5rem",
                    color: "#FF00FF",
                    textShadow: `
          0 0 2px #FF00FF,
          0 0 4px rgba(255,0,255,0.7),
          0 0 6px rgba(255,0,255,0.5)
        `,
                  }}
                />
              </Box>
              <Typography
                variant="h4"
                sx={{
                  color: "#00FFFF",
                  mr: 2,
                  textDecoration: "none",
                  fontSize: "3.5rem",
                  textShadow: " 0 0 1px #00FFFF, 0 0 3px #00FFFF",

                  backgroundColor: "#2C3E50",
                  display: "inline-block",
                  padding: "8px 16px",
                }}
                component={NavLink}
                to="/events"
              >
                ReHub
              </Typography>
              <Stack>
                <Typography
                  variant="h6"
                  component={NavLink}
                  to="/events"
                  sx={{ color: "#FFFF66", textDecoration: "none" }}
                >
                  Learn · Network · Grow
                </Typography>
                <Typography
                  variant="h6"
                  component={NavLink}
                  to="/events"
                  sx={{ color: "#FFFF66", textDecoration: "none" }}
                >
                  Events & Networking for Real Estate Pros
                </Typography>
              </Stack>
            </Box>
            <Box
              sx={{
                textTransform: "uppercase",
                display: "flex",
                gap: 6,
                justifyContent: "flex-end",
                alignItems: "center",
                color: "#FFFF",
                flexGrow: 1,
                fontWeight: "bold",
              }}
            >
              <MenuItemLink to="/events">
                <span style={{ color: "#FFFF", fontWeight: "bolder" }}>
                  All Events
                </span>
              </MenuItemLink>

              {currentUser ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <WavingHandOutlinedIcon />
                  <Typography
                    sx={{
                      fontWeight: 500,
                      textDecoration: "none",
                      color: "#FFFF",
                      pt: 0,
                    }}
                    component={Link}
                    to={`profile/${currentUser.id}`}
                  >
                    Hello ,{" "}
                    <span style={{ color: "#FFD54F", fontWeight: "bolder" }}>
                      {" "}
                      {currentUser.displayName}
                    </span>
                  </Typography>
                  <UserMenu />
                </Box>
              ) : (
                <Box sx={{ display: "flex", gap: 3, mr: 3 }}>
                  <MenuItemLink to="/register">
                    <Typography
                      variant="h6"
                      sx={{ color: !currentUser && "#FF9933" }}
                    >
                      Register
                    </Typography>
                  </MenuItemLink>
                  <MenuItemLink to="/login">
                    <Typography
                      variant="h6"
                      sx={{ color: !currentUser && "#66FFFF" }}
                    >
                      Login
                    </Typography>
                  </MenuItemLink>
                </Box>
              )}
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
