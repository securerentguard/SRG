import { Box, Typography, Divider } from "@mui/material";

export default function ContractReviewSummary({ formData }) {

  const calculateLeaseDuration = () => {
    const { startDate, endDate } = formData.duration;
    if (!startDate || !endDate) return "Not calculated";

    const start = new Date(startDate);
    const end = new Date(endDate);
    const durationInMilliseconds = end - start;

    // Convert duration from milliseconds to days
    const durationInDays = Math.ceil(durationInMilliseconds / (1000 * 60 * 60 * 24));

    return `${durationInDays} days`;
  };

  return (
    <Box sx={{ marginTop: "50px" }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Contract Review Summary
      </Typography>

      {/* Property Details */}
      <Typography variant="h6" sx={{ mb: 1 }}>
        Property Details
      </Typography>
      <Typography variant="body1">Property Name: {formData.name}</Typography>
      <Typography variant="body1">Address: {formData.address}</Typography> {/* Make sure formData contains address */}

      <Divider sx={{ my: 2 }} />

      {/* Tenants Details */}
      <Typography variant="h6" sx={{ mb: 1 }}>
        Tenants Information
      </Typography>
      {formData.tenants.map((tenant, index) => (
        <Typography variant="body1" key={tenant.id}>
          Tenant {index + 1}: {tenant.email || "Not Provided"} {/* Display tenant email */}
        </Typography>
      ))}

      <Divider sx={{ my: 2 }} />

      {/* Rent Information */}
      <Typography variant="h6" sx={{ mb: 1 }}>
        Rent Information
      </Typography>
      <Typography variant="body1">Total Rent: {formData.totalRent}</Typography>
      <Typography variant="body1">Lease Start Date: {formData.duration.startDate}</Typography>
      <Typography variant="body1">Lease End Date: {formData.duration.endDate}</Typography>
      <Typography variant="body1">Rent Due Date: {formData.rentDate}</Typography>
      <Typography variant="body1">
        Lease Duration: {calculateLeaseDuration()}
      </Typography>

      <Divider sx={{ my: 2 }} />

      {/* Insurance Information */}
      <Typography variant="h6" sx={{ mb: 1 }}>
        Insurance Information
      </Typography>
      <Typography variant="body1">
        Insurance Provider: {formData.insuranceProvider || "Not Provided"}
      </Typography>
      <Typography variant="body1">
        Insurance Premium: {formData.insurancePremium || "Not Selected"}
      </Typography>
      <Typography variant="body1">
        Insurance Coverage Amount: {formData.coverageAmount || "Not Provided"}
      </Typography>

     
    </Box>
  );
}
