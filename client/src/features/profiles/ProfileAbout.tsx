import { Box, Button, Divider } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useProfile } from "../../lib/hooks/useprofile";
import { useParams } from "react-router";
import { useState } from "react";
import ProfileEdit from "./ProfileEdit";

export default function ProfileAbout() {
  const { id } = useParams();
  const { profile, isCurrentUser } = useProfile(id);
  const [editMode, setEditMode] = useState(false);
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            gap: 1,
            fontSize: "1.9rem",
            textTransform: "uppercase",
            fontWeight: "bold",
          }}
        >
          <Typography
            sx={{
              fontSize: "1.9rem",
              textTransform: "uppercase",
              fontWeight: "bold",
            }}
          >
            About
          </Typography>
          <Typography
            sx={{
              fontSize: "1.9rem",
              textTransform: "uppercase",
              fontWeight: "bold",
              color: "#9400D3",
            }}
          >
            {profile?.displayName}
          </Typography>
        </Box>

        {isCurrentUser && (
          <Button
            onClick={() => setEditMode(!editMode)}
            sx={{ fontSize: "large" }}
          >
            Edit profile
          </Button>
        )}
      </Box>
      <Divider sx={{ mb: 2 }} />
      <Box sx={{ overflow: "auto", maxWidth: 850 }}>
        <Typography
          variant="body1"
          color="initial"
          sx={{ whiteSpace: "pre-wrap" }}
        >
          {profile?.bio || "My story is comming up..."}
        </Typography>
        {editMode && <ProfileEdit setEditMode={setEditMode} />}
      </Box>
    </Box>
  );
}
