
import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { NavLink } from "react-router";

export default function HomePage() {
  const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <Box sx={{ position: "absolute", width: "100vw", height: "100vh", overflow: "hidden" }}>
      {/* 썸네일 이미지: 동영상 로딩 전 표시 */}
      {!videoLoaded && (
        <img
          src="/mainHome-poster.jpg"
          alt="Intro"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />
      )}

      {/* 동영상 */}
      <video
        autoPlay
        loop
        muted
        playsInline
        onLoadedData={() => setVideoLoaded(true)}
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

      {/* 반투명 오버레이 */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.4)",
        }}
      />

      {/* 텍스트 + 클릭 영역 */}
      <Box
        component={NavLink}
        to="/events"
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
          Global Real Estate Forum
        </Typography>
        <Typography variant="h5" sx={{ mt: 2 }}>
          Connect. Learn. Invest.
        </Typography>
      </Box>
    </Box>
  );
}
