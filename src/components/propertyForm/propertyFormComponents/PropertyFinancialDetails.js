import React from "react";
import { Box, TextField } from "@mui/material";

export default function PropertyFinancialDetails({ formData, setFormData }) {
  return (
    <Box sx={{ marginTop: "50px" }}>
      <TextField
        label="Tax ID"
        variant="outlined"
        fullWidth
        value={formData.taxId || ""}
        onChange={(e) =>
          setFormData((prevData) => ({
            ...prevData,
            taxId: e.target.value,
          }))
        }
        sx={{ mb: 2 }}
      />
      <TextField
        label="Mortgage Info"
        variant="outlined"
        fullWidth
        value={formData.mortgageInfo || ""}
        onChange={(e) =>
          setFormData((prevData) => ({
            ...prevData,
            mortgageInfo: e.target.value,
          }))
        }
        sx={{ mb: 2 }}
      />
    </Box>
  );
}
