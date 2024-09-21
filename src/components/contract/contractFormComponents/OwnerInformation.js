import { useEffect } from "react";
import { TextField, Box } from "@mui/material";

export default function OwnerInformation({ formData, setFormData }) {
  useEffect(() => {
    // Get the token from localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user ? user.token : null;

    if (token) {
      // Split the token to get the payload (second part of the token)
      const base64Url = token.split('.')[1];

      // Decode the base64-encoded payload
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join('')
      );

      // Parse the payload and extract the email
      const decodedToken = JSON.parse(jsonPayload);
      const ownerEmail = decodedToken.email;

      // Update the formData with the decoded email
      setFormData((prevFormData) => ({
        ...prevFormData,
        email: ownerEmail,
      }));
    }
  }, [setFormData]);

  return (
    <Box sx={{ marginTop: "50px" }}>
      <TextField
        label="Full Name"
        variant="outlined"
        fullWidth
        value={formData.fullName}
        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Date of Birth"
        variant="outlined"
        fullWidth
        type="date"
        value={formData.dob}
        onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
        InputLabelProps={{
          shrink: true,
        }}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Phone Number"
        variant="outlined"
        fullWidth
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Personal Details"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={formData.personalDetails}
        onChange={(e) =>
          setFormData({ ...formData, personalDetails: e.target.value })
        }
        sx={{ mb: 2 }}
      />
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        value={formData.email} // This will be pre-filled from the token
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        sx={{ mb: 2 }}
        disabled // Disable the email field
      />
    </Box>
  );
}
