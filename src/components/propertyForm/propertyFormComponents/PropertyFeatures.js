import { TextField, Box, FormGroup, FormControlLabel, Checkbox, Typography } from "@mui/material";

export default function PropertyFeatures({ formData, setFormData }) {
  const handleCheckboxChange = (e) => {
    setFormData({
      ...formData,
      amenities: {
        ...formData.amenities,
        [e.target.name]: e.target.checked,
      },
    });
  };

  return (
    <Box sx={{ marginTop: "50px" }}>
      <TextField
        label="Number of Units"
        variant="outlined"
        fullWidth
        value={formData.numberOfUnits}
        onChange={(e) =>
          setFormData({ ...formData, numberOfUnits: e.target.value })
        }
        sx={{ mb: 2 }}
      />
      <TextField
        label="Number of Bedrooms"
        variant="outlined"
        fullWidth
        value={formData.numberOfBedrooms}
        onChange={(e) =>
          setFormData({ ...formData, numberOfBedrooms: e.target.value })
        }
        sx={{ mb: 2 }}
      />
      <TextField
        label="Number of Bathrooms"
        variant="outlined"
        fullWidth
        value={formData.numberOfBathrooms}
        onChange={(e) =>
          setFormData({ ...formData, numberOfBathrooms: e.target.value })
        }
        sx={{ mb: 2 }}
      />
      <TextField
        label="Square Footage"
        variant="outlined"
        fullWidth
        value={formData.squareFootage}
        onChange={(e) =>
          setFormData({ ...formData, squareFootage: e.target.value })
        }
        sx={{ mb: 2 }}
      />

      {/* Amenities Section */}
      <Box sx={{ marginTop: "20px", padding: "20px", backgroundColor: "#f5f5f5", borderRadius: "10px" }}>
        <Typography variant="h6" gutterBottom>
          Select Amenities
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.amenities.pool}
                onChange={handleCheckboxChange}
                name="pool"
              />
            }
            label="Pool"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.amenities.gym}
                onChange={handleCheckboxChange}
                name="gym"
              />
            }
            label="Gym"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.amenities.parking}
                onChange={handleCheckboxChange}
                name="parking"
              />
            }
            label="Parking"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.amenities.laundry}
                onChange={handleCheckboxChange}
                name="laundry"
              />
            }
            label="Laundry"
          />
        </FormGroup>
      </Box>
    </Box>
  );
}
