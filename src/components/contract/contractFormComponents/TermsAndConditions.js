import { Box, Checkbox, Typography } from "@mui/material";
import { useState } from "react";

export default function TermsAndConditions({agreedToTerms, setAgreedToTerms}) {
  const [agreedToTerm1, setAgreedToTerm1] = useState(false);
  const [agreedToTerm2, setAgreedToTerm2] = useState(false);

  const handleCheckboxChange1 = (e) => {
    const checked = e.target.checked;
    setAgreedToTerm1(checked);
    setAgreedToTerms(checked && agreedToTerm2)
  };

  const handleCheckboxChange2 = (e) => {
    const checked = e.target.checked;
    setAgreedToTerm2(checked);
    setAgreedToTerms(checked && agreedToTerm1);
  };

  return (
    <Box sx={{ marginTop: "50px" }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Terms and Conditions
      </Typography>
      
      <Box sx={{ display: "flex", alignItems: "flex-start", mb: 2 }}>
        <Checkbox checked={agreedToTerm1} onChange={handleCheckboxChange1} />
        <Typography variant="body1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
          convallis orci ac nulla dapibus, ac venenatis enim placerat. Vivamus
          malesuada libero vitae sem bibendum, vitae egestas neque laoreet.
        </Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "flex-start", mb: 2 }}>
        <Checkbox checked={agreedToTerm2} onChange={handleCheckboxChange2} />
        <Typography variant="body1">
          Nulla facilisi. Suspendisse eget lectus ut elit convallis fermentum.
          Aenean tempor est non sapien cursus, a bibendum enim venenatis.
        </Typography>
      </Box>
    </Box>
  );
}
