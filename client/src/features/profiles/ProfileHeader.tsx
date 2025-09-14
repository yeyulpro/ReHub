import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import { useProfile } from "../../lib/hooks/useprofile";
import { useParams } from "react-router";

export default function ProfileHeader() {
  const { id } = useParams();
  const { isCurrentUser, updateFollowing, profile } = useProfile(id);

  if (!profile)
    return <Typography color="initial">Profile is not found...</Typography>;

  return (
    <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
      <Grid container spacing={3}>
        <Grid size={8}>
          <Stack direction={"row"} spacing={3} alignItems="center">
            <Avatar
              src={profile.imageUrl}
              alt={`${profile.displayName} image`}
              sx={{ width: 150, height: 150 }}
            />
            <Box gap={2}>
              <Typography variant="h6" color="initial">
                {profile.displayName}
              </Typography>
              {profile.following && (
                <Chip
                  label="I am following"
                  variant="outlined"
                  color="secondary"
                />
              )}
            </Box>
          </Stack>
        </Grid>
        <Grid size={4}>
          <Stack alignItems="center">
            <Box
              display="flex"
              justifyContent="space-around"
              sx={{ mb: 4 }}
              width="100"
              gap={8}
            >
              <Box textAlign="center">
                <Typography
                  variant="h6"
                  color="initial"
                  sx={{ textTransform: "capitalize" }}
                >
                  followers
                </Typography>
                <Typography variant="h6" color="initial">
                  {profile.followersCount}
                </Typography>
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h6"
                  color="initial"
                  sx={{ textTransform: "capitalize" }}
                >
                  following
                </Typography>
                <Typography variant="h6" color="initial">
                  {profile.followingsCount}
                </Typography>
              </Box>
            </Box>
            <Divider />
            {!isCurrentUser && (
              <>
                <Button
                  fullWidth
                  variant="outlined"
                  color={profile.following ? "error" : "secondary"}
                  onClick={() => {
                    updateFollowing.mutate();
                  }}
                >
                  {profile.following ? "Unfollow" : "Follow"}
                </Button>
              </>
            )}
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
}
