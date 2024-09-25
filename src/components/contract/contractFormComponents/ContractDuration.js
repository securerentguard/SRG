import { TextField, Box } from "@mui/material";
import { useState, useEffect } from "react";

export default function ContractDuration({ formData, setFormData }) {
  const [duration, setDuration] = useState("");

  useEffect(() => {
    const calculateDuration = () => {
      const startDate = new Date(formData.duration.startDate);
      const endDate = new Date(formData.duration.endDate);

      if (!isNaN(startDate) && !isNaN(endDate) && endDate > startDate) {
        const diffInTime = endDate.getTime() - startDate.getTime();
        const diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24));
        setDuration(`${diffInDays} days`);
      } else {
        setDuration("");
      }
    };

    calculateDuration();
  }, [formData.duration.startDate, formData.duration.endDate]);

  return (
    <Box sx={{ marginTop: "50px" }}>
      <TextField
        label="Lease Start Date"
        fullWidth
        type="date"
        value={formData.duration.startDate}
        onChange={(e) =>
          setFormData({
            ...formData,
            duration: {
              ...formData.duration,
              startDate: e.target.value,
            },
          })
        }
        InputLabelProps={{
          shrink: true,
        }}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Lease End Date"
        fullWidth
        type="date"
        value={formData.duration.endDate}
        onChange={(e) =>
          setFormData({
            ...formData,
            duration: {
              ...formData.duration,
              endDate: e.target.value,
            },
          })
        }
        InputLabelProps={{
          shrink: true,
        }}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Lease Duration"
        variant="outlined"
        fullWidth
        value={duration}
        InputProps={{
          readOnly: true,
        }}
        sx={{ mb: 2 }}
      />
    </Box>
  );
}
