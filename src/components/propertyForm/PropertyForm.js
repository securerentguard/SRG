"use client";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PropertyDetails from "./propertyFormComponents/PropertyDetails";
import PropertyFeatures from "./propertyFormComponents/PropertyFeatures";
import PropertyImages from "./propertyFormComponents/PropertyImages";
import PropertyManagement from "./propertyFormComponents/PropertyManagement";
import PropertyFinancialDetails from "./propertyFormComponents/PropertyFinancialDetails";
import PropertyNotes from "./propertyFormComponents/PropertyNotes";
import ReviewAndSubmit from "./propertyFormComponents/ReviewAndSubmit";

// Define the steps
const steps = [
  "Property Details",
  "Property Features",
  "Property Images",
  "Property Management",
  "Property Financial Details",
  "Property Notes",
  "Review & Submit",
];

// Moved outside of the main component to prevent re-renders
const StepContent = ({ step, formData, setFormData }) => {
  switch (step) {
    case 0:
      return <PropertyDetails formData={formData} setFormData={setFormData} />;
    case 1:
      return <PropertyFeatures formData={formData} setFormData={setFormData} />;
    case 2:
      return <PropertyImages formData={formData} setFormData={setFormData} />;
    case 3:
      return (
        <PropertyManagement formData={formData} setFormData={setFormData} />
      );
    case 4:
      return (
        <PropertyFinancialDetails
          formData={formData}
          setFormData={setFormData}
        />
      );
    case 5:
      return <PropertyNotes formData={formData} setFormData={setFormData} />;
    case 6:
      return <ReviewAndSubmit formData={formData} setFormData={setFormData} />;
    default:
      return "Unknown Step";
  }
};

export default function PropertyForm() {
  const [activeStep, setActiveStep] = useState(0);

  const [formData, setFormData] = useState({
    name: "", // name of the property
    address: "", // address (can be street + city + state)
    street: "",
    city: "",
    state: "",
    postalCode: "", // renamed from 'zip' to 'postalCode'
    propertyType: "", // matches the enum in the schema
    features: {
      // nested object for property features
      units: "",
      bedrooms: "",
      bathrooms: "",
      squareFootage: "",
    },
    amenities: {
      // nested object for amenities
      pool: false,
      gym: false,
      parking: false,
      laundry: false,
    },
    images: [], // array to store image URLs or file paths
    propertyManagement: {
      // nested object for management details
      manager: "",
      phone: "",
      email: "",
    },
    taxId: "",
    mortgageInfo: "", // string for mortgage information
    notes: "", // additional notes
  });

  const handleNext = () => setActiveStep((prevStep) => prevStep + 1);
  const handleBack = () => setActiveStep((prevStep) => prevStep - 1);

 

  const handleSubmit = async () => {
    try {
      // Retrieve user and token from localStorage
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user ? user.token : null;

      if (!token) {
        alert("Please login first.");
        return; // Stop if no token is available
      }

      // Make the API request to add property
      const response = await fetch("/api/addproperty", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the token in Authorization header
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      // Handle the response and alert user
      if (response.ok) {
        alert("Property added successfully!");
      } else {
        alert(`Failed to add property: ${result.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error adding property:", error);
      alert("An error occurred while adding the property.");
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>All steps completed</Typography>
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <StepContent
            step={activeStep}
            formData={formData}
            setFormData={setFormData}
          />
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button
              onClick={
                activeStep === steps.length - 1 ? handleSubmit : handleNext
              }
            >
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
