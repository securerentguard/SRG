// import {
//   TextField,
//   Box,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Checkbox,
//   FormControlLabel,
// } from "@mui/material";
// import { useState } from "react";

// export default function InsuranceDetails({ formData, setFormData }) {
//   const [agreedToTerms, setAgreedToTerms] = useState(false);

//   const handleCheckboxChange = (e) => {
//     setAgreedToTerms(e.target.checked);
//   };

//   return (
//     <Box sx={{ marginTop: "50px" }}>
//       <FormControl fullWidth sx={{ mb: 2 }}>
//         <InputLabel>Insurance Provider</InputLabel>
//         <Select
//           label="Insurance Provider"
//           value={formData.insuranceProvider}
//           onChange={(e) =>
//             setFormData({ ...formData, insuranceProvider: e.target.value })
//           }
//         >
//           <MenuItem value="Provider 1">Provider 1</MenuItem>
//           <MenuItem value="Provider 2">Provider 2</MenuItem>
//           <MenuItem value="Provider 3">Provider 3</MenuItem>
//           <MenuItem value="Provider 4">Provider 4</MenuItem>
//           <MenuItem value="Provider 5">Provider 5</MenuItem>
//         </Select>
//       </FormControl>

//       <FormControl fullWidth sx={{ mb: 2 }}>
//         <InputLabel>Insurance Premium</InputLabel>
//         <Select
//           label="Insurance Premium"
//           value={formData.insurancePremium}
//           onChange={(e) =>
//             setFormData({ ...formData, insurancePremium: e.target.value })
//           }
//         >
//           <MenuItem value="normal">Normal</MenuItem>
//           <MenuItem value="premium">Premium</MenuItem>
//         </Select>
//       </FormControl>

//       <TextField
//         label="Insurance Coverage Amount"
//         variant="outlined"
//         fullWidth
//         value={formData.insuranceAmount}
//         onChange={(e) =>
//           setFormData({ ...formData, insuranceAmount: e.target.value })
//         }
//         sx={{ mb: 2 }}
//       />

//       <Box sx={{ mb: 2 }}>
//         <p>Insurance Terms</p>
//         <FormControlLabel
//           control={
//             <Checkbox checked={agreedToTerms} onChange={handleCheckboxChange} />
//           }
//           label="I agree to the insurance terms"
//         />
//       </Box>
//     </Box>
//   );
// }
// InsuranceDetails.js
import {
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

export default function InsuranceDetails({
  formData,
  setFormData,
  agreedToTerms,
  setAgreedToTerms, // Pass this from the parent
}) {
  const handleCheckboxChange = (e) => {
    setAgreedToTerms(e.target.checked);
  };

  return (
    <Box sx={{ marginTop: "50px" }}>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Insurance Provider</InputLabel>
        <Select
          label="Insurance Provider"
          value={formData.insuranceProvider}
          onChange={(e) =>
            setFormData({ ...formData, insuranceProvider: e.target.value })
          }
        >
          <MenuItem value="Provider 1">Provider 1</MenuItem>
          <MenuItem value="Provider 2">Provider 2</MenuItem>
          <MenuItem value="Provider 3">Provider 3</MenuItem>
          <MenuItem value="Provider 4">Provider 4</MenuItem>
          <MenuItem value="Provider 5">Provider 5</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Insurance Premium</InputLabel>
        <Select
          label="Insurance Premium"
          value={formData.insurancePremium}
          onChange={(e) =>
            setFormData({ ...formData, insurancePremium: e.target.value })
          }
        >
          <MenuItem value="normal">Normal</MenuItem>
          <MenuItem value="premium">Premium</MenuItem>
        </Select>
      </FormControl>

      <TextField
        label="Insurance Coverage Amount"
        variant="outlined"
        fullWidth
        value={formData.insuranceAmount}
        onChange={(e) =>
          setFormData({ ...formData, insuranceAmount: e.target.value })
        }
        sx={{ mb: 2 }}
      />

      <Box sx={{ mb: 2 }}>
        <p>Insurance Terms</p>
        <FormControlLabel
          control={
            <Checkbox checked={agreedToTerms} onChange={handleCheckboxChange} />
          }
          label="I agree to the insurance terms"
        />
      </Box>
    </Box>
  );
}
