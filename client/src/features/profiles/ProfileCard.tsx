import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Divider,
  Chip,
} from "@mui/material";

import { Profile } from "../../lib/types";
import EmojiPeopleRoundedIcon from "@mui/icons-material/EmojiPeopleRounded";

type Props = {
  profile: Profile;
};
export default function ProfileCard({ profile }: Props) {
  return (
    <Card
      sx={{ textDecoration: "none", color: "inherit", maxWidth: 300 }}
      elevation={4}
    >
      <CardMedia
        component="img"
        src={profile?.imageUrl || "/images/person.png"}
        height="200"
        sx={{ width: "100%", zIndex: 50, p: 2 }}
        alt={profile.displayName + " image"}
      />
      <CardContent sx={{ justifyItems: "center" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Typography gutterBottom variant="h5" component="div">
            {profile.displayName}
            {profile.bio && (
              <Typography
                variant="body2"
                color="initial"
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {profile?.bio || (
                  <Typography variant="h6">
                    dfadklflasdkfa;sleiaweifalsdfjas
                  </Typography>
                )}
              </Typography>
            )}
          </Typography>
          {profile.following && (
            <Chip
              size="small"
              label="Following"
              color="secondary"
              variant="outlined"
            />
          )}
        </Box>
      </CardContent>
      <Divider />
      <Box
        sx={{
          display: "flex",
          color: "text.secondary",
          textDecoration: "none",
          justifyContent: "center",
          gap: 2,
          p: 2,
        }}
      >
        <EmojiPeopleRoundedIcon />
        <Typography> Followers are {profile.followersCount}</Typography>
      </Box>
    </Card>
  );
}
