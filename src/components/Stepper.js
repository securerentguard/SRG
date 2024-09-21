// "use client";
// import React, { useState } from "react";
// import Box from "@mui/material/Box";
// import Stepper from "@mui/material/Stepper";
// import Step from "@mui/material/Step";
// import StepLabel from "@mui/material/StepLabel";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";

// // Import the steps
// import PropertyDetails from "../components/stepperSteps/PropertyDetails";
// import PropertyFeatures from "../components/stepperSteps/PropertyFeatures";

// // Define the steps
// const steps = ["Property Details", "Property Features", "Review & Submit"];

// export default function OwnerDashboard() {
//   const [activeStep, setActiveStep] = useState(0);
//   const [formData, setFormData] = useState({
//     propertyName: "",
//     street: "",
//     city: "",
//     state: "",
//     zip: "",
//     propertyType: "",
//     numberOfUnits: "",
//     numberOfBedrooms: "",
//     numberOfBathrooms: "",
//     squareFootage: "",
//   });

//   const handleNext = () => setActiveStep((prevStep) => prevStep + 1);
//   const handleBack = () => setActiveStep((prevStep) => prevStep - 1);

//   const handleSubmit = () => {
//     console.log("Form Data Submitted:", formData);
//   };

//   // Component for rendering current step
//   const StepContent = ({ step }) => {
//     switch (step) {
//       case 0:
//         return <PropertyDetails formData={formData} setFormData={setFormData} />;
//       case 1:
//         return <PropertyFeatures formData={formData} setFormData={setFormData} />;
//       case 2:
//         return (
//           <Typography>
//             Review Data: {JSON.stringify(formData, null, 2)}
//           </Typography>
//         );
//       default:
//         return "Unknown Step";
//     }
//   };

//   return (
//     <Box sx={{ width: "100%" }}>
//       <Stepper activeStep={activeStep}>
//         {steps.map((label, index) => (
//           <Step key={label}>
//             <StepLabel>{label}</StepLabel>
//           </Step>
//         ))}
//       </Stepper>

//       {activeStep === steps.length ? (
//         <React.Fragment>
//           <Typography sx={{ mt: 2, mb: 1 }}>All steps completed</Typography>
//           <Button variant="contained" onClick={handleSubmit}>
//             Submit
//           </Button>
//         </React.Fragment>
//       ) : (
//         <React.Fragment>
//           <StepContent step={activeStep} />
//           <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
//             <Button
//               color="inherit"
//               disabled={activeStep === 0}
//               onClick={handleBack}
//               sx={{ mr: 1 }}
//             >
//               Back
//             </Button>
//             <Box sx={{ flex: "1 1 auto" }} />
//             <Button onClick={handleNext}>
//               {activeStep === steps.length - 1 ? "Finish" : "Next"}
//             </Button>
//           </Box>
//         </React.Fragment>
//       )}
//     </Box>
//   );
// }
"use client";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

// Import the steps
import PropertyDetails from "../components/stepperSteps/PropertyDetails";
import PropertyFeatures from "../components/stepperSteps/PropertyFeatures";

// Define the steps
const steps = ["Property Details", "Property Features", "Review & Submit"];

// Moved outside of the main component to prevent re-renders
const StepContent = ({ step, formData, setFormData }) => {
  switch (step) {
    case 0:
      return <PropertyDetails formData={formData} setFormData={setFormData} />;
    case 1:
      return <PropertyFeatures formData={formData} setFormData={setFormData} />;
    case 2:
      return (
        <Typography>
          Review Data: {JSON.stringify(formData, null, 2)}
        </Typography>
      );
    default:
      return "Unknown Step";
  }
};

export default function OwnerDashboard() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    propertyName: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    propertyType: "",
    numberOfUnits: "",
    numberOfBedrooms: "",
    numberOfBathrooms: "",
    squareFootage: "",
  });

  const handleNext = () => setActiveStep((prevStep) => prevStep + 1);
  const handleBack = () => setActiveStep((prevStep) => prevStep - 1);

  const handleSubmit = () => {
    console.log("Form Data Submitted:", formData);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => (
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
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}