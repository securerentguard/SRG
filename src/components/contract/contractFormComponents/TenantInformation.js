// import { TextField, Box, Button } from "@mui/material";

// export default function TenantInformation({ formData, setFormData }) {
//   const handleAddTenant = () => {
//     setFormData({
//       ...formData,
//       tenants: [...formData.tenants, { id: formData.tenants.length + 1, name: "" }],
//     });
//   };

//   const handleTenantChange = (index, value) => {
//     const updatedTenants = formData.tenants.map((tenant, i) =>
//       i === index ? { ...tenant, name: value } : tenant
//     );
//     setFormData({ ...formData, tenants: updatedTenants });
//   };

//   return (
//     <Box sx={{ marginTop: "50px" }}>
//       {formData.tenants.map((tenant, index) => (
//         <TextField
//           key={tenant.id}
//           label={`Invite Tenant ${tenant.id}`}
//           variant="outlined"
//           fullWidth
//           value={tenant.name}
//           onChange={(e) => handleTenantChange(index, e.target.value)}
//           sx={{ mb: 2 }}
//         />
//       ))}
//       <Button variant="contained" onClick={handleAddTenant}>
//         Add Another Tenant
//       </Button>
//     </Box>
//   );
// }

import { TextField, Box, Button } from "@mui/material";

export default function TenantInformation({ formData, setFormData }) {
  const handleAddTenant = () => {
    setFormData({
      ...formData,
      tenants: [...formData.tenants, { id: formData.tenants.length + 1, email: "" }],
    });
  };

  const handleTenantChange = (index, value) => {
    const updatedTenants = formData.tenants.map((tenant, i) =>
      i === index ? { ...tenant, email: value } : tenant
    );
    setFormData({ ...formData, tenants: updatedTenants });
  };

  return (
    <Box sx={{ marginTop: "50px" }}>
      {formData.tenants.map((tenant, index) => (
        <TextField
          key={tenant.id}
          label={`Invite Tenant ${tenant.id}`}
          variant="outlined"
          fullWidth
          value={tenant.email}
          onChange={(e) => handleTenantChange(index, e.target.value)}
          sx={{ mb: 2 }}
        />
      ))}
      <Button variant="contained" onClick={handleAddTenant}>
        Add Another Tenant
      </Button>
    </Box>
  );
}
