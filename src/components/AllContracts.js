"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Grid,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import CloseIcon from "@mui/icons-material/Close";

// Sample AllContracts Component
export default function AllContracts() {
  const router = useRouter();
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedContract, setSelectedContract] = useState(null);

  // Fetch contracts on component load
  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = user ? user.token : null;

        const response = await fetch("/api/owner/contracts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch contracts");
        }

        const data = await response.json();
        setContracts(data); // Save contracts in state
        setLoading(false);
      } catch (error) {
        console.error("Error fetching contracts:", error);
        setLoading(false);
      }
    };

    fetchContracts();
  }, []);

  // Open modal with contract details
  const handleOpen = (contract) => {
    setSelectedContract(contract);
    setOpen(true);
  };

  // Close modal
  const handleClose = () => {
    setOpen(false);
    setSelectedContract(null);
  };

  return (
    <Grid container direction="column" spacing={3}>
      {/* Contracts Table */}
      <Grid item>
        <h2>All Contracts</h2>
        {loading ? (
          <CircularProgress />
        ) : contracts.length === 0 ? (
          <p>No contracts found</p>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Contract Name</TableCell>
                  <TableCell>Start Date</TableCell>
                  <TableCell>End Date</TableCell>
                  <TableCell>Details</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {contracts.map((contract) => (
                  <TableRow key={contract._id}>
                    <TableCell>{contract.name}</TableCell>
                    <TableCell>{new Date(contract.duration.startDate).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(contract.duration.endDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleOpen(contract)}>
                        <InfoIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Grid>

      {/* Contract Details Modal */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>
          Contract Details
          <IconButton
            onClick={handleClose}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ width: "90%" }}>
          {selectedContract ? (
            <div>
              <p><strong>Name:</strong> {selectedContract.name}</p>
              <p><strong>Property ID:</strong> {selectedContract.propertyId}</p>
              <p><strong>Owner ID:</strong> {selectedContract.ownerId}</p>
              <p><strong>Temp Tenants:</strong> {selectedContract.tempTenants.join(", ")}</p>
              <p><strong>Tenants:</strong></p>
              <ul>
                {selectedContract.tenants.map((tenant) => (
                  <li key={tenant.tenantId}>
                    Tenant ID: {tenant.tenantId} - Rent Contribution: {tenant.rentContribution}
                  </li>
                ))}
              </ul>
              <p><strong>Total Rent:</strong> {selectedContract.totalRent}</p>
              <p><strong>Rent Date:</strong> {new Date(selectedContract.rentDate).toLocaleDateString()}</p>
              <p><strong>Payment Method:</strong> {selectedContract.paymentMethod}</p>
              <p><strong>Security Deposit:</strong> {selectedContract.securityDeposit}</p>
              <p><strong>Duration:</strong> {new Date(selectedContract.duration.startDate).toLocaleDateString()} to {new Date(selectedContract.duration.endDate).toLocaleDateString()}</p>
              <p><strong>Insurance Amount:</strong> {selectedContract.insuranceAmount}</p>
              <p><strong>Status:</strong> {selectedContract.status}</p>
              <p><strong>Created At:</strong> {new Date(selectedContract.createdByOwnerAt).toLocaleDateString()}</p>
              <p><strong>Accepted At:</strong> {selectedContract.acceptedByTenantsAt ? new Date(selectedContract.acceptedByTenantsAt).toLocaleDateString() : 'Not accepted yet'}</p>
            </div>
          ) : (
            <p>No contract selected</p>
          )}
        </DialogContent>
      </Dialog>
    </Grid>
  );
}
