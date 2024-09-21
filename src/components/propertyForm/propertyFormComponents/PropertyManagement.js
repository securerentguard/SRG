import React from "react";
import { Box, TextField, FormControl, InputLabel, OutlinedInput } from "@mui/material";

export default function PropertyManagement({ formData, setFormData }) {
  return (
    <Box sx={{ marginTop: "50px" }}>
      <TextField
        label="Manager"
        variant="outlined"
        fullWidth
        value={formData.propertyManagement.manager || ""}
        onChange={(e) =>
          setFormData((prevData) => ({
            ...prevData,
            propertyManagement: {
              ...prevData.propertyManagement,
              manager: e.target.value,
            },
          }))
        }
        sx={{ mb: 2 }}
      />
      <TextField
        label="Phone"
        variant="outlined"
        fullWidth
        value={formData.propertyManagement.phone || ""}
        onChange={(e) =>
          setFormData((prevData) => ({
            ...prevData,
            propertyManagement: {
              ...prevData.propertyManagement,
              phone: e.target.value,
            },
          }))
        }
        sx={{ mb: 2 }}
      />
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        value={formData.propertyManagement.email || ""}
        onChange={(e) =>
          setFormData((prevData) => ({
            ...prevData,
            propertyManagement: {
              ...prevData.propertyManagement,
              email: e.target.value,
            },
          }))
        }
        sx={{ mb: 2 }}
      />
    </Box>
  );
}
