import { useParams } from "react-router";
import { useProfile } from "../../lib/hooks/useprofile";
import { Box, Button, Divider, Typography } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { useState } from "react";
import PhotoUploadWidget from "./PhotoUploadWidget";
import DeletePhoto from "./DeletePhoto";
import UpdateProfileImage from "./UpdateProfileImage";
// import { InsertEmoticon } from "@mui/icons-material";

export default function ProfilePhoto() {
  const { id } = useParams();
  const {
    photos,
    loadingPhotos,
    isCurrentUser,
    uploadPhoto,
    setMainPhoto,
    profile,
    deletePhoto,
  } = useProfile(id);
  const [editMode, setEditMode] = useState(false);

  const handlePhotoUpload = (file: Blob) => {
    uploadPhoto.mutate(file, {
      onSuccess: () => {
        setEditMode(false);
      },
    });
  };

  if (loadingPhotos)
    return <Typography color="initial">Loading Photos...</Typography>;
  if (!photos)
    return <Typography color="initial">No photos are found...</Typography>;

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          sx={{
            fontSize: "1.9rem",
            textTransform: "uppercase",
            fontWeight: "bold",
            color: "#2196f3",
          }}
        >
          Photos
        </Typography>

        {isCurrentUser && (
          <Button
            onClick={() => setEditMode(!editMode)}
            sx={{ color: editMode ? "#599468" : "#0000ff", mb: 1.5 }}
            variant="outlined"
          >
            {editMode ? "Cancel" : "Add Photo"}
          </Button>
        )}
      </Box>
      <Divider />
      {editMode ? (
        <>
          <PhotoUploadWidget
            uploadPhoto={handlePhotoUpload}
            loading={uploadPhoto.isPending}
          />
        </>
      ) : (
        <>
          <ImageList
            sx={{ width: 1200, height: 350, overflow: "auto", gap: 3 }}
            cols={6}
            rowHeight={164}
          >
            {photos.map((item) => (
              <ImageListItem
                key={item.id}
                sx={{
                  m: 1,
                  borderRadius: 2,
                  border:
                    profile?.imageUrl == item.url
                      ? "6px solid #FFA500"
                      : "1px solid grey",
                  overflow: "hidden",
                }}
              >
                <img
                  srcSet={`${item.url
                    .replace("http://", "https://")
                    .replace(
                      "/upload/",
                      "/upload/w_164,h_164,c_fill,f_auto,dpr_2,g_face/"
                    )} 2x`}
                  src={`${item.url
                    .replace("http://", "https://")
                    .replace(
                      "/upload/",
                      "/upload/w_164,h_164,c_fill,f_auto,dpr_2,g_face/"
                    )}`}
                  alt={"user profile image"}
                  loading="lazy"
                />
                {isCurrentUser && (
                  <>
                    <Box
                      sx={{ position: "absolute", top: "6px", left: "-16px" }}
                      onClick={() => setMainPhoto.mutate(item)}
                    >
                      <UpdateProfileImage
                        selected={item.url == profile?.imageUrl}
                      />
                    </Box>
                    <Box
                      sx={{ position: "absolute", top: "6px", left: "128px" }}
                      onClick={() => deletePhoto.mutate(item.id)}
                    >
                      <DeletePhoto />
                    </Box>
                  </>
                )}
              </ImageListItem>
            ))}
          </ImageList>
        </>
      )}
    </Box>
  );
}
