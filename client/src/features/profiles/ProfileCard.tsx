import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Divider,
  Link,
  Chip,
} from "@mui/material";

import { Profile } from "../../lib/types";
import EmojiPeopleRoundedIcon from "@mui/icons-material/EmojiPeopleRounded";

type Props = {
  profile: Profile;
};
export default function ProfileCard({ profile }: Props) {
  const following = true;
  return (
    <Link sx={{ color: "red", textDecoration: "none" }} href="/events">
      <Card
        sx={{ textDecoration: "none", color: "inherit", maxWidth: 300 }}
        elevation={4}
      >
        <CardMedia
          component="img"
          src={profile?.imageUrl || "/images/person.png"}
          height="200"
          sx={{ width: 200, zIndex: 50, p: 2 }}
          alt={profile.displayName + " image"}
        />
        <CardContent sx={{ justifyItems: "center" }}>
          <Box display="flex" alignItems="center" gap={1}>
            <Typography gutterBottom variant="h5" component="div">
              {profile.displayName}
            </Typography>
            {following && (
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
          <Typography> Followers are {following ? 20 : 3}</Typography>
        </Box>
      </Card>
    </Link>
  );
}
