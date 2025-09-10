import { Box, Button, Grid, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import BackupTwoToneIcon from "@mui/icons-material/BackupTwoTone";

import { useRef } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";

type Props = {
  uploadPhoto: (file: Blob) => void;
  loading: boolean;
};
export default function PhotoUploadWidget({ uploadPhoto, loading }: Props) {
  //react-cropper
  const [files, setFiles] = useState<object & { preview: string }[]>([]);

  const cropperRef = useRef<ReactCropperElement>(null);

  const onCrop = useCallback(() => {
    const cropper = cropperRef.current?.cropper;
    cropper?.getCroppedCanvas().toBlob((blob) => {
      if (blob) uploadPhoto(blob);
    });
  }, [uploadPhoto]);

  //react-dropzone
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file as Blob),
        })
      )
    );
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Grid container sx={{ justifyContent: "end" }}>
      <Grid
        size={4}
        sx={{ textAlign: "center", alignContent: "center", margin: "0 auto" }}
      >
        <Typography variant="overline" color="#4169E1">
          Setp1 - Add Photo
        </Typography>
        <Box
          {...getRootProps()}
          sx={{
            border: "dashed 3px #898E88",
            borderColor: isDragActive ? "#00ff" : "#898E88",
            borderRadius: 3,
            padding: 7,
            textAlign: "center",
            height: "280px",
            width: "370px",
          }}
        >
          <input {...getInputProps()} />
          <BackupTwoToneIcon sx={{ width: 100, height: 100 }} />
          {isDragActive ? (
            <Typography>Drop the files here ...</Typography>
          ) : (
            <Typography>
              Drag & drop some files here, or click to select files
            </Typography>
          )}
        </Box>
      </Grid>
      <Grid
        size={4}
        sx={{ textAlign: "center", alignContent: "center", margin: "0 auto" }}
      >
        <Typography variant="overline" color="#4169E1">
          Step2 - Resize Photo
        </Typography>
        {files[0]?.preview && (
          <Cropper
            src={files[0]?.preview}
            style={{ height: 280, width: "100%" }}
            // Cropper.js options
            initialAspectRatio={1}
            preview=".img-preview"
            guides={true}
            ref={cropperRef}
          />
        )}
      </Grid>
      <Grid
        size={4}
        sx={{ textAlign: "center", alignContent: "center", margin: "0 auto" }}
      >
        <Typography variant="overline" color="#4169E1">
          Step3 - Preview & Upload
        </Typography>
        {files[0]?.preview && (
          <>
            <div
              className="img-preview"
              style={{
                height: 280,
                width: "100%",
                overflow: "hidden",
                margin: "0 auto",
              }}
            />
          </>
        )}
      </Grid>
      <Button
        sx={{ mt: 2, mr: 7, width: "280px" }}
        onClick={onCrop}
        variant="contained"
        color="primary"
        disabled={loading}
      >
        Upload
      </Button>
    </Grid>
  );
}
