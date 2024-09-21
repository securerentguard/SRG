import { TextField, Box } from "@mui/material";

export default function PropertyDetails({ formData, setFormData }) {
  return (
    <Box sx={{ marginTop:"50px" }}>
      <TextField
        label="Property Name"
        variant="outlined"
        fullWidth
        value={formData.propertyName}
        onChange={(e) => setFormData({ ...formData, propertyName: e.target.value })}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Street"
        variant="outlined"
        fullWidth
        value={formData.street}
        onChange={(e) => setFormData({ ...formData, street: e.target.value })}
        sx={{ mb: 2 }}
      />
      <TextField
        label="City"
        variant="outlined"
        fullWidth
        value={formData.city}
        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
        sx={{ mb: 2 }}
      />
      <TextField
        label="State"
        variant="outlined"
        fullWidth
        value={formData.state}
        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
        sx={{ mb: 2 }}
      />
      <TextField
        label="ZIP Code"
        variant="outlined"
        fullWidth
        value={formData.zip}
        onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
      />
    </Box>
  );
}
