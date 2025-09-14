import { Grid, Typography } from "@mui/material";
import ProfileHeader from "./ProfileHeader";
import ProfileContent from "./ProfileContent";
import { useProfile } from "../../lib/hooks/useprofile";
import { useParams } from "react-router";

export default function ProfilePage() {
  const { id } = useParams();
  const { profile, loadingProfile } = useProfile(id);

  if (loadingProfile)
    return <Typography color="initial">Loading Profile...</Typography>;
  if (!profile)
    return <Typography color="initial">Profile is not found...</Typography>;
  return (
    <Grid container>
      <Grid size={12}>
        <ProfileHeader />
        <ProfileContent />
      </Grid>
    </Grid>
  );
}
