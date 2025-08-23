import { Box, CssBaseline } from "@mui/material";
import { Outlet } from "react-router";

export default function MainHome() {
  return (
    <Box sx={{ backgroundColor: "#f1f1f1", height: "100%" }}>
      <CssBaseline />
      <Box>
        <Outlet />
      </Box>
    </Box>
  );
}
