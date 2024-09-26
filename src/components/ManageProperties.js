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
import AddIcon from "@mui/icons-material/Add";
import InfoIcon from "@mui/icons-material/Info";
import CloseIcon from "@mui/icons-material/Close";

// Sample ManageProperties Component
export default function ManageProperties() {
  const router = useRouter();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);

  // Fetch properties on component load
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = user ? user.token : null;

        console.log("heelo " + token);
        const response = await fetch("/api/owner/properties", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch properties");
        }

        const data = await response.json();
        setProperties(data); // Save properties in state
        setLoading(false);
      } catch (error) {
        console.error("Error fetching properties:", error);
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Open modal with property details
  const handleOpen = (property) => {
    setSelectedProperty(property);
    setOpen(true);
  };

  // Close modal
  const handleClose = () => {
    setOpen(false);
    setSelectedProperty(null);
  };

  return (
    <Grid container direction="column" spacing={3}>
      {/* Add Property Button */}
      <Grid item>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => router.push("/dashboard/owner/addproperty")}
        >
          Add Property
        </Button>
      </Grid>

      {/* Properties Table */}
      <Grid item>
        <h2>Properties</h2>
        {loading ? (
          <CircularProgress />
        ) : properties.length === 0 ? (
          <p>No properties found</p>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Property Name</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Details</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {properties.map((property) => (
                  <TableRow key={property._id}>
                    <TableCell>{property.name}</TableCell>
                    <TableCell>{property.address}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleOpen(property)}>
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

      {/* Property Details Modal */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>
          Property Details
          <IconButton
            onClick={handleClose}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ width: "90%" }}>
          {selectedProperty ? (
            <div>
              <p>
                <strong>Name:</strong> {selectedProperty.name}
              </p>
              <p>
                <strong>Address:</strong> {selectedProperty.address}
              </p>
              <p>
                <strong>Street:</strong> {selectedProperty.street}
              </p>
              <p>
                <strong>City:</strong> {selectedProperty.city}
              </p>
              <p>
                <strong>State:</strong> {selectedProperty.state}
              </p>
              <p>
                <strong>Postal Code:</strong> {selectedProperty.postalCode}
              </p>
              <p>
                <strong>Property Type:</strong> {selectedProperty.propertyType}
              </p>
              <p>
                <strong>Units:</strong> {selectedProperty.features?.units}
              </p>
              <p>
                <strong>Bedrooms:</strong> {selectedProperty.features?.bedrooms}
              </p>
              <p>
                <strong>Bathrooms:</strong>{" "}
                {selectedProperty.features?.bathrooms}
              </p>
              <p>
                <strong>Square Footage:</strong>{" "}
                {selectedProperty.features?.squareFootage}
              </p>
              <p>
                <strong>Pool:</strong>{" "}
                {selectedProperty.amenities?.pool ? "Yes" : "No"}
              </p>
              <p>
                <strong>Gym:</strong>{" "}
                {selectedProperty.amenities?.gym ? "Yes" : "No"}
              </p>
              <p>
                <strong>Parking:</strong>{" "}
                {selectedProperty.amenities?.parking ? "Yes" : "No"}
              </p>
              <p>
                <strong>Laundry:</strong>{" "}
                {selectedProperty.amenities?.laundry ? "Yes" : "No"}
              </p>
              <p>
                <strong>Manager:</strong>{" "}
                {selectedProperty.propertyManagement?.manager}
              </p>
              <p>
                <strong>Phone:</strong>{" "}
                {selectedProperty.propertyManagement?.phone}
              </p>
              <p>
                <strong>Email:</strong>{" "}
                {selectedProperty.propertyManagement?.email}
              </p>
              <p>
                <strong>Mortgage Info:</strong> {selectedProperty.mortgageInfo}
              </p>
              <p>
                <strong>Notes:</strong> {selectedProperty.notes}
              </p>
            </div>
          ) : (
            <p>No property selected</p>
          )}
        </DialogContent>
      </Dialog>
    </Grid>
  );
}
