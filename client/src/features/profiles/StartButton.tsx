import { Box, Button } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

export default function StartButton() {
  return (
    <Box sx={{ position: "relative" }}>
      <Button
        sx={{
          position: "absolute",
          opacity: 0.5,
          transition: "opacity 0.3s",
          cursor: "pointer",
        }}
      >
        <StarIcon sx={{ fontSize: 32, color: "white", position: "absolute" }} />
      </Button>
    </Box>
  );
}
