import { useState } from "react";
import {
  TextField,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Checkbox,
  FormGroup,
} from "@mui/material";

export default function RentAndPaymentTerms({ formData, setFormData }) {
  const [latePaymentPolicy, setLatePaymentPolicy] = useState(false);

  const handleCheckboxChange = (event) => {
    setLatePaymentPolicy(event.target.checked);
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <Box sx={{ marginTop: "50px" }}>
      {/* Total Rent Amount */}
      <TextField
        label="Total Rent Amount"
        variant="outlined"
        fullWidth
        type="number"
        value={formData.totalRent || ""}
        onChange={(e) => handleInputChange("totalRent", e.target.value)}
        sx={{ mb: 2 }}
      />

      {/* Rent Due Date (Date Picker) */}
      <TextField
        label="Rent Due Date"
        variant="outlined"
        fullWidth
        type="date"
        value={formData.rentDueDate || ""}
        onChange={(e) => handleInputChange("rentDueDate", e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
        sx={{ mb: 2 }}
      />

      {/* Payment Method */}
      <FormControl component="fieldset" sx={{ mb: 2 }}>
        <FormLabel component="legend">Payment Method</FormLabel>
        <RadioGroup
          value={formData.paymentMethod || ""}
          onChange={(e) => handleInputChange("paymentMethod", e.target.value)}
        >
          <FormControlLabel
            value="Direct Bank Transfer"
            control={<Radio />}
            label="Direct Bank Transfer"
          />
          <FormControlLabel
            value="Platform-Managed Payment"
            control={<Radio />}
            label="Platform-Managed Payment"
          />
        </RadioGroup>
      </FormControl>

      {/* Late Payment Policy */}
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox checked={latePaymentPolicy} onChange={handleCheckboxChange} />
          }
          label="Include Late Payment Policy"
        />
        {latePaymentPolicy && (
          <TextField
            label="Late Payment Policy Terms"
            variant="outlined"
            fullWidth
            multiline
            rows={3}
            value={formData.latePaymentPolicy || ""}
            onChange={(e) => handleInputChange("latePaymentPolicy", e.target.value)}
            sx={{ mb: 2 }}
          />
        )}
      </FormGroup>

      {/* Security Deposit */}
      <TextField
        label="Security Deposit Amount"
        variant="outlined"
        fullWidth
        type="number"
        value={formData.securityDeposit || ""}
        onChange={(e) => handleInputChange("securityDeposit", e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Security Deposit Terms"
        variant="outlined"
        fullWidth
        multiline
        rows={3}
        value={formData.securityDepositTerms || ""}
        onChange={(e) => handleInputChange("securityDepositTerms", e.target.value)}
        sx={{ mb: 2 }}
      />
    </Box>
  );
}
