import { useProfile } from "../../lib/hooks/useprofile";
import { useParams } from "react-router";
import { Box, Divider, Typography } from "@mui/material";
import ProfileCard from "./ProfileCard";

type Props = {
  activeTab: number;
};
export default function ProfileFollowings({ activeTab }: Props) {
  const { id } = useParams();
  const predicate = activeTab === 3 ? "followers" : "followings";
  const { profile, loadingfollowings, followings } = useProfile(id, predicate);
  if (!profile) return <Typography> Loading...</Typography>;

  return (
    <Box>
      <Box sx={{ display: "flex" }}>
        <Typography variant="h5" color="initial">
          {activeTab === 3
            ? `These people are following ${profile?.displayName}`
            : `${profile?.displayName} is following these people.`}
        </Typography>
      </Box>
      <Divider />
      <Box>
        {loadingfollowings ? (
          <Typography variant="h4">Loading...</Typography>
        ) : (
          <Box sx={{ display: "flex", gap: 2 }}>
            {followings?.map((profile) => (
              <ProfileCard key={profile.id} profile={profile} />
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
}
