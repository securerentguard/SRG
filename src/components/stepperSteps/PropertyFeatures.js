import { TextField, Box } from "@mui/material";

export default function PropertyFeatures({ formData, setFormData }) {
  return (
    <Box sx={{ marginTop:"50px" }}>
      <TextField
        label="Property Type"
        variant="outlined"
        fullWidth
        value={formData.propertyType}
        onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Number of Units"
        variant="outlined"
        fullWidth
        value={formData.numberOfUnits}
        onChange={(e) => setFormData({ ...formData, numberOfUnits: e.target.value })}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Number of Bedrooms"
        variant="outlined"
        fullWidth
        value={formData.numberOfBedrooms}
        onChange={(e) => setFormData({ ...formData, numberOfBedrooms: e.target.value })}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Number of Bathrooms"
        variant="outlined"
        fullWidth
        value={formData.numberOfBathrooms}
        onChange={(e) => setFormData({ ...formData, numberOfBathrooms: e.target.value })}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Square Footage"
        variant="outlined"
        fullWidth
        value={formData.squareFootage}
        onChange={(e) => setFormData({ ...formData, squareFootage: e.target.value })}
      />
    </Box>
  );
}
