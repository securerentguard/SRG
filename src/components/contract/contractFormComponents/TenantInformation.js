import { TextField, Box, Button, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function TenantInformation({ formData, setFormData }) {
  const handleAddTenant = () => {
    if (formData.newTenantEmail) {
      const newTenant = { id: formData.tenants.length + 1, email: formData.newTenantEmail };
      setFormData({
        ...formData,
        tenants: [...formData.tenants, newTenant],
        newTenantEmail: "",
      });
    }
  };

  const handleTenantChange = (value) => {
    setFormData({ ...formData, newTenantEmail: value });
  };

  const handleRemoveTenant = (id) => {
    const updatedTenants = formData.tenants.filter((tenant) => tenant.id !== id);
    setFormData({ ...formData, tenants: updatedTenants });
  };

  return (
    <Box sx={{ marginTop: "50px" }}>
      {formData.tenants.length === 0 ? (
        <Typography variant="h4" gutterBottom>
          No tenants added
        </Typography>
      ) : (
        <Box>
          {formData.tenants.map((tenant) => (
            <Box
              key={tenant.id}
              sx={{ display: "flex", alignItems: "center", mb: 2 }}
            >
              <Typography variant="body1" sx={{ flexGrow: 1 }}>
                {tenant.email}
              </Typography>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleRemoveTenant(tenant.id)}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
        </Box>
      )}

      <TextField
        label="Invite Tenant"
        variant="outlined"
        fullWidth
        value={formData.newTenantEmail || ""}
        onChange={(e) => handleTenantChange(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button variant="contained" onClick={handleAddTenant}>
        Add Tenant
      </Button>
    </Box>
  );
}
