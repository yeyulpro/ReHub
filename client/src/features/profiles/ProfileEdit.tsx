import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { useProfile } from "../../lib/hooks/useprofile";
import {
  EditProfileSchema,
  editProfileSchema,
} from "../../lib/schema/EditProfileSchema";
import CustomTextField from "../events/form/CustomTextField";

type Props = {
  setEditMode: (editMode: boolean) => void;
};
export default function ProfileEdit({ setEditMode }: Props) {
  const { id } = useParams();
  const { updateProfile, profile } = useProfile(id);
  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty, isValid },
  } = useForm<EditProfileSchema>({
    resolver: zodResolver(editProfileSchema),
    mode: "onTouched",
  });
  const onSubmit = (data: EditProfileSchema) => {
    updateProfile.mutate(data, {
      onSuccess: () => setEditMode(false),
    });
  };
  useEffect(() => {
    reset({
      displayName: profile?.displayName,
      bio: profile?.bio || "",
    });
  }, [profile, reset]);
  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      display="flex"
      flexDirection="column"
      alignContent="center"
      gap={3}
      mt={3}
    >
      <CustomTextField
        label="Display Name"
        name="displayName"
        control={control}
      />
      <CustomTextField
        label="Add your bio"
        name="bio"
        control={control}
        multiline
        rows={4}
      />
      <Button
        type="submit"
        variant="contained"
        disabled={!isValid || !isDirty || updateProfile.isPending}
      >
        Update profile
      </Button>
    </Box>
  );
}
