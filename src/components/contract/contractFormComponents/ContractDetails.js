import { useEffect, useState } from "react";
import {
  TextField,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";

export default function ContractDetails({ formData, setFormData }) {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user ? user.token : null;

      if (token) {
        const response = await fetch("/api/owner/properties", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProperties(data);
        } else {
          console.error("Failed to fetch properties");
        }
      }
    };

    fetchProperties();
  }, []);

  return (
    <Box sx={{ marginTop: "50px" }}>
      <TextField
        label="Contract Name"
        variant="outlined"
        fullWidth
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        sx={{ mb: 2 }}
      />

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Property</InputLabel>
        <Select
          label="Property"
          value={formData.propertyId || ""} // Use propertyId for clarity
          onChange={(e) => {
            const selectedProperty = properties.find(property => property._id === e.target.value);
            setFormData({ 
              ...formData, 
              propertyId: e.target.value, // Store the property ID
              address: selectedProperty ? selectedProperty.name : "", // Save the property name in address
            });
          }}
        >
          {properties.map((property) => (
            <MenuItem key={property._id} value={property._id}>
              {property.name} {/* Show property name */}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
