import React, { useState } from "react";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import { Delete as DeleteIcon, CloudUpload as UploadIcon } from "@mui/icons-material";

export default function PropertyImages() {
  const [imagePreviews, setImagePreviews] = useState([]);

  // Handle image upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));

    setImagePreviews((prevImages) => [...prevImages, ...newImages]);

    files.forEach((file) => URL.revokeObjectURL(file));
  };

  // Handle image deletion
  const handleImageDelete = (index) => {
    const newImagePreviews = imagePreviews.filter((_, i) => i !== index);
    setImagePreviews(newImagePreviews);
  };

  return (
    <Box sx={{ marginTop: "50px" }}>
      <Grid container spacing={2} justifyContent="center">
        {/* Render image previews */}
        {imagePreviews.map((image, index) => (
          <Grid item xs={6} sm={4} md={3} lg={2} key={index}>
            <Box
              sx={{
                position: "relative",
                height: "150px",
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "10px",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              {/* Delete Icon */}
              <IconButton
                onClick={() => handleImageDelete(index)}
                sx={{
                  position: "absolute",
                  top: "5px",
                  right: "5px",
                  backgroundColor: "rgba(255, 255, 255, 0.7)",
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </Grid>
        ))}

        {/* Upload Button */}
        <Grid item xs={6} sm={4} md={3} lg={2}>
          <Box
            component="label"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "150px",
              backgroundColor: "#f5f5f5",
              borderRadius: "10px",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              cursor: "pointer",
              textAlign: "center",
            }}
          >
            <UploadIcon sx={{ fontSize: 40, color: "#999" }} />
            <Typography variant="body2" sx={{ color: "#999" }}>
              Upload Image
            </Typography>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
