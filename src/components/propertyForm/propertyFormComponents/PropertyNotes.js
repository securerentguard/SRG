import React from "react";
import { Box, TextField } from "@mui/material";

export default function PropertyNotes({ formData, setFormData }) {
  return (
    <Box sx={{ marginTop: "50px" }}>
      <TextField
        label="Notes"
        variant="outlined"
        fullWidth
        multiline
        rows={4}  // Adjust rows for a larger textarea
        value={formData.notes || ""}
        onChange={(e) =>
          setFormData((prevData) => ({
            ...prevData,
            notes: e.target.value,
          }))
        }
        sx={{ mb: 2 }}
      />
    </Box>
  );
}