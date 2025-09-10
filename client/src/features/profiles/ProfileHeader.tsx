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
import { Profile } from "../../lib/types";
type Props = {
  profile: Profile;
};
export default function ProfileHeader({ profile }: Props) {
  const isFollowing = true;
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
              {isFollowing && (
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
          <Stack spacing={2} alignItems="center">
            <Box
              display="flex"
              justifyContent="space-around"
              width="100"
              gap={3}
            >
              <Box textAlign="center">
                <Typography variant="h6" color="initial">
                  followers
                </Typography>
                <Typography variant="h6" color="initial">
                  5
                </Typography>
              </Box>
              <Box textAlign="center">
                <Typography variant="h6" color="initial">
                  following
                </Typography>
                <Typography variant="h6" color="initial">
                  5
                </Typography>
              </Box>
            </Box>
            <Divider />
            <Button
              fullWidth
              variant="outlined"
              color={isFollowing ? "error" : "secondary"}
            >
              {isFollowing ? "Unfollow" : "Follow"}
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
}
