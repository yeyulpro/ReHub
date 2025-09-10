import {
  Avatar,
  Box,
  Button,
  Divider,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useAccount } from "../../lib/hooks/useAccount";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useNavigate } from "react-router";

export default function UserMenu() {
  const { logOutUser, currentUser } = useAccount();

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Button color="inherit" onClick={handleClick} sx={{ gap: 2 }}>
        <Avatar src={currentUser?.imageUrl} alt="Current user image" />
        user menu
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            "aria-labelledby": "basic-button",
          },
        }}
      >
        <MenuItem
          sx={{ display: "flex", gap: 2 }}
          onClick={() => navigate("/createEvent")}
        >
          <AddIcon />
          <Typography color="initial">Create Event</Typography>
        </MenuItem>
        <MenuItem
          sx={{ display: "flex", gap: 2 }}
          component={Link}
          to={`/profile/${currentUser?.id}`}
        >
          <PersonIcon />
          <Typography color="initial">My Profile</Typography>
        </MenuItem>
        <Divider />
        <MenuItem
          sx={{ display: "flex", gap: 2 }}
          onClick={() => {
            logOutUser.mutate();
          }}
        >
          <LogoutIcon />
          <Typography color="initial">Log Out</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
}
