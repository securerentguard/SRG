import React from "react";
import { Box, Typography, Button, Divider, Grid } from "@mui/material";

export default function ReviewAndSubmit({ formData, onSubmit, onEdit }) {
  return (
    <Box sx={{ marginTop: "50px", padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
      <Typography variant="h6" gutterBottom>
        Review Your Information
      </Typography>
      
      {/* Displaying form data */}
      <Grid container spacing={2}>
        {/* Display Property Details */}
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" fontWeight="bold">Property Details</Typography>
          <Typography><strong>Name:</strong> {formData.name}</Typography>
          <Typography><strong>Street:</strong> {formData.street}</Typography>
          <Typography><strong>City:</strong> {formData.city}</Typography>
          <Typography><strong>State:</strong> {formData.state}</Typography>
          <Typography><strong>ZIP Code:</strong> {formData.zip}</Typography>
          <Typography><strong>Property Type:</strong> {formData.propertyType}</Typography>
        </Grid>
        
        {/* Display Features */}
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" fontWeight="bold">Features</Typography>
          <Typography><strong>Number of Units:</strong> {formData.numberOfUnits}</Typography>
          <Typography><strong>Number of Bedrooms:</strong> {formData.numberOfBedrooms}</Typography>
          <Typography><strong>Number of Bathrooms:</strong> {formData.numberOfBathrooms}</Typography>
          <Typography><strong>Square Footage:</strong> {formData.squareFootage}</Typography>
        </Grid>
        
        {/* Display Amenities */}
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" fontWeight="bold">Amenities</Typography>
          <Typography><strong>Pool:</strong> {formData.amenities?.pool ? 'Yes' : 'No'}</Typography>
          <Typography><strong>Gym:</strong> {formData.amenities?.gym ? 'Yes' : 'No'}</Typography>
          <Typography><strong>Parking:</strong> {formData.amenities?.parking ? 'Yes' : 'No'}</Typography>
          <Typography><strong>Laundry:</strong> {formData.amenities?.laundry ? 'Yes' : 'No'}</Typography>
        </Grid>
        
        {/* Display Property Management */}
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" fontWeight="bold">Property Management</Typography>
          <Typography><strong>Manager:</strong> {formData.propertyManagement?.manager}</Typography>
          <Typography><strong>Phone:</strong> {formData.propertyManagement?.phone}</Typography>
          <Typography><strong>Email:</strong> {formData.propertyManagement?.email}</Typography>
        </Grid>
        
        {/* Display Financial Details */}
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" fontWeight="bold">Financial Details</Typography>
          <Typography><strong>Tax ID:</strong> {formData.taxId}</Typography>
          <Typography><strong>Mortgage Info:</strong> {formData.mortgageInfo}</Typography>
        </Grid>
        
        {/* Display Notes */}
        <Grid item xs={12}>
          <Typography variant="subtitle1" fontWeight="bold">Notes</Typography>
          <Typography>{formData.notes}</Typography>
        </Grid>
        
        {/* Display Images */}
        {formData.images.length > 0 && (
          <Grid item xs={12}>
            <Typography variant="subtitle1" fontWeight="bold">Images</Typography>
            <Grid container spacing={2}>
              {formData.images.map((image, index) => (
                <Grid item xs={6} sm={4} md={3} lg={2} key={index}>
                  <Box
                    sx={{
                      height: "150px",
                      backgroundImage: `url(${image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      borderRadius: "10px",
                      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
