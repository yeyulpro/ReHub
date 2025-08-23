import { Box, Typography } from "@mui/material";
import { NavLink } from "react-router";

export default function HomePage() {
  return (
    <Box sx={{ position: "absolute" }}>
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          position: "relative",
          marginLeft: "-24px",
        }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            position: "absolute",

            top: 0,
            left: 0,
          }}
        >
          <source src="/mainHome.mp4" type="video/mp4" />
        </video>

        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.4)",
          }}
        />

        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            color: "white",
            textAlign: "center",
            textDecoration: "none",
          }}
          component={NavLink}
          to={"/events"}
        >
          <Typography variant="h2" fontWeight="bold">
            Global Real Estate Forum
          </Typography>
          <Typography variant="h5" sx={{ mt: 2 }}>
            Connect. Learn. Invest.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
