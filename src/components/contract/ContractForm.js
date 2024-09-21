"use client";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ContractDetails from "./contractFormComponents/ContractDetails";
import OwnerInformation from "./contractFormComponents/OwnerInformation";
import ContractDuration from "./contractFormComponents/ContractDuration";
import InsuranceDetails from "./contractFormComponents/InsuranceDetails";
import TenantInformation from "./contractFormComponents/TenantInformation";
import TermsAndConditions from "./contractFormComponents/TermsAndConditions";
import ContractReviewSummary from "./contractFormComponents/ContractReviewSummary";

// Define the steps
const steps = [
  "Contract Details",
  "Owner Information",
  "Contract Duration",
  "Insurance Details",
  "Tenant Information",
  "Terms And Conditions",
  "Review & Submit",
];

const StepContent = ({
  step,
  formData,
  setFormData,
  agreedToTerms,
  setAgreedToTerms,
  agreedToTerms2,
  setAgreedToTerms2,
}) => {
  switch (step) {
    case 0:
      return <ContractDetails formData={formData} setFormData={setFormData} />;
    case 1:
      return <OwnerInformation formData={formData} setFormData={setFormData} />;
    case 2:
      return <ContractDuration formData={formData} setFormData={setFormData} />;
    case 3:
      return (
        <InsuranceDetails
          formData={formData}
          setFormData={setFormData}
          agreedToTerms={agreedToTerms}
          setAgreedToTerms={setAgreedToTerms}
        />
      );
    case 4:
      return (
        <TenantInformation formData={formData} setFormData={setFormData} />
      );
    case 5:
      return (
        <TermsAndConditions
          agreedToTerms={agreedToTerms2}
          setAgreedToTerms={setAgreedToTerms2}
        />
      );
    case 6:
      return (
        <ContractReviewSummary formData={formData} setFormData={setFormData} />
      );
    default:
      return "Unknown Step";
  }
};

export default function ContractForm() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    propertyId: "",
    address: "",
    tenants: [{ id: 1, email: "" }],
    totalRent: 0,
    duration: {
      startDate: "",
      endDate: "",
    },
    rentDate: "",
    insuranceAmount: 0,
  });
  const [agreedToTerms, setAgreedToTerms] = useState(false); // State for checkbox
  const [agreedToTerms2, setAgreedToTerms2] = useState(false);

  const handleNext = () => setActiveStep((prevStep) => prevStep + 1);
  const handleBack = () => setActiveStep((prevStep) => prevStep - 1);

  const handleSubmit = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user ? user.token : null;
  
      if (!token) {
        alert("Please login first.");
        return;
      }
  
      const response = await fetch("/api/createcontract", { // Change endpoint to your contract API
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          propertyId: formData.propertyId, // Assuming you have propertyId in formData
          tenants: formData.tenants, // This should contain tenant emails
          totalRent: formData.totalRent,
          rentDate: formData.rentDate,
          paymentMethod: formData.paymentMethod, // If applicable
          securityDeposit: formData.securityDeposit,
          duration: formData.duration,
          insuranceAmount: formData.insuranceAmount,
        }),
      });
  
      const result = await response.json();
      if (response.ok) {
        alert("Contract created successfully!");
        // You can reset formData or redirect here if needed
      } else {
        alert(`Failed to create contract: ${result.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error creating contract:", error);
      alert("An error occurred while creating the contract.");
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
            agreedToTerms={agreedToTerms}
            setAgreedToTerms={setAgreedToTerms}
            agreedToTerms2={agreedToTerms2}
            setAgreedToTerms2={setAgreedToTerms2}
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
              disabled={
                (activeStep === 3 && !agreedToTerms) || // For step 3
                (activeStep === 5 && !agreedToTerms2) // For step 5
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
