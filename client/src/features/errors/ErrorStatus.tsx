import { Box, Button, CssBaseline, Typography } from "@mui/material";
import NavBar from "../../app/layout/NavBar";

import { useLocation, useNavigate } from "react-router";

export default function ErrorStatus() {
  const navigate = useNavigate();
  const goBack = () => {
   
    navigate("/events"); 
 
  };
  const location = useLocation();
  const { data, message } = location.state || {};
const status = data?.status || "Oppose";
const title = data?.title || "Something went wrong!";
const infoMessage = message || "Well, this is awkward. The site you're looking for is not here.";


  return (
    <>
      <CssBaseline />
      <NavBar />
      <Box sx={{ position: "absolute" }}>
        <Box
          sx={{
            width: "100vw",
            height: "100vh",
            position: "relative",
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
            <source src="/notFound.mp4" type="video/mp4" />
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
          >
            <Typography variant="h2" fontWeight="bold">
              {status}
            </Typography>
            <Typography variant="h5" sx={{ mt: 2 }}>
              {title}
            </Typography>
            <Typography variant="h6" sx={{ mt: 2 }}>
              {infoMessage}
            </Typography>
            <Button  onClick={goBack} sx={{fontSize:'large', color:'#FFFF',bgcolor:'green'}} variant="contained">
              Back 
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
