import { TextField, Box } from "@mui/material";
import { MenuItem, Select, FormControl, InputLabel } from "@mui/material";

export default function PropertyDetails({ formData, setFormData }) {
  return (
    <Box sx={{ marginTop: "50px" }}>
      <TextField
        label="Property Name"
        variant="outlined"
        fullWidth
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Address"
        variant="outlined"
        fullWidth
        value={formData.address}
        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
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
        sx={{ mb: 2 }}
      />

      <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
        <InputLabel>Property Type</InputLabel>
        <Select
          label="Property Type"
          value={formData.propertyType}
          onChange={(e) =>
            setFormData({ ...formData, propertyType: e.target.value })
          }
        >
          <MenuItem value="apartment">Apartment</MenuItem>
          <MenuItem value="house">House</MenuItem>
          <MenuItem value="condo">Condo</MenuItem>
          <MenuItem value="duplex">Duplex</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
