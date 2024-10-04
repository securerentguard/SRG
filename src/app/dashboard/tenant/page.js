"use client";

import { useState } from "react";
import '../dashboard.css';
import { Grid, List, ListItem, ListItemText, Box } from "@mui/material";
import CurrentContracts from "@/components/CurrentContracts";
import Invitations from "@/components/Invitations";

// Placeholder Components for CurrentContracts and Invitations
// const CurrentContracts = () => <Box>Current Contracts Component</Box>;
// const Invitations = () => <Box>Invitations Component</Box>;

export default function TenantDashboard() {
  const [selectedOption, setSelectedOption] = useState("currentContracts");

  // List of options for TenantDashboard
  const options = [
    { id: "currentContracts", label: "Current Contracts" },
    { id: "invitations", label: "Invitations" },
  ];

  // Function to render the content based on selected option
  const renderContent = () => {
    switch (selectedOption) {
      case "currentContracts":
        return <CurrentContracts />; // Render CurrentContracts when selected
      case "invitations":
        return <Invitations />; // Render Invitations when selected
      default:
        return <CurrentContracts />;
    }
  };

  return (
    <div className="container">
      <Grid container spacing={2}>
        {/* Left panel for options */}
        <Grid item sm={4} md={2}>
          <List>
            {options.map((option) => (
              <ListItem
                key={option.id}
                button
                onClick={() => setSelectedOption(option.id)}
                sx={{
                  backgroundColor:
                    selectedOption === option.id ? "lightblue" : "inherit",
                  borderRadius: "4px",
                  marginBottom: "8px",
                }}
              >
                <ListItemText primary={option.label} />
              </ListItem>
            ))}
          </List>
        </Grid>

        {/* Right panel for content */}
        <Grid item sm={8} md={10}>
          <Box>{renderContent()}</Box>
        </Grid>
      </Grid>
    </div>
  );
}
"use client";

import { useState } from "react";
import './dashboard.css';
import { Grid, List, ListItem, ListItemText, Box } from "@mui/material";
import ManageProperties from "@/components/ManageProperties";
import AllContracts from "@/components/AllContracts";

// Placeholder Component for AllContracts
// const AllContracts = () => <Box>All Contracts Component</Box>;

export default function OwnerDashboard() {
  const [selectedOption, setSelectedOption] = useState("allContracts");

  // List of options
  const options = [
    { id: "allContracts", label: "All Contracts" },
    { id: "manageProperties", label: "Manage Properties" },
    {id:"transactions",label:"Transactions"},
  ];

  // Function to render the content based on selected option
  const renderContent = () => {
    switch (selectedOption) {
      case "allContracts":
        return <AllContracts />;
      case "manageProperties":
        return <ManageProperties />; // Render ManageProperties when selected
      case "manageProperties":
        return <Transactions />;
      default:
        return <AllContracts />;
    }
  };

  return (
    <div className="container">
      <Grid container spacing={2}>
        {/* Left panel for options */}
        <Grid item sm={4} md={2}>
          <List>
            {options.map((option) => (
              <ListItem
                key={option.id}
                button
                onClick={() => setSelectedOption(option.id)}
                sx={{
                  backgroundColor:
                    selectedOption === option.id ? "lightblue" : "inherit",
                  borderRadius: "4px",
                  marginBottom: "8px",
                }}
              >
                <ListItemText primary={option.label} />
              </ListItem>
            ))}
          </List>
        </Grid>

        {/* Right panel for content */}
        <Grid item sm={8} md={10}>
          <Box>{renderContent()}</Box>
        </Grid>
      </Grid>
    </div>
  );
}
