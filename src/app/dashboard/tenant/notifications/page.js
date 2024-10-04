"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  CircularProgress,
  Box,
  Divider,
} from "@mui/material";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Function to fetch notifications
  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("tenant");
      if (!token) {
        alert("Unauthorized: Please log in.");
        router.push("/login"); // Redirect to login if token is missing
        return;
      }

      const parsedToken = JSON.parse(token); // Parse the stored token

      const res = await fetch("/api/tenant/notifications", {
        headers: {
          Authorization: `Bearer ${parsedToken.token}`,
        },
      });

      const data = await res.json();
      if (res.ok) {
        setNotifications(data.notifications);
      } else {
        alert(`Error fetching notifications: ${data.message}`);
      }
    } catch (error) {
      alert("Network error while fetching notifications.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // Helper function to format date and time
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    return `${formattedDate} at ${formattedTime}`;
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div className="container">
      <Container maxWidth="sm">
        <Typography variant="h4" align="center" gutterBottom>
          Notifications
        </Typography>
        {notifications.length === 0 ? (
          <Typography variant="body1" align="center">
            No notifications available.
          </Typography>
        ) : (
          <List>
            {notifications.map((notification, index) => (
              <Paper
                elevation={2}
                key={index}
                sx={{ marginBottom: "16px", padding: "8px" }}
              >
                <ListItem>
                  <ListItemText
                    primary={notification.message}
                    secondary={formatDateTime(notification.date)}
                  />
                </ListItem>
                {index < notifications.length - 1 && <Divider />}
              </Paper>
            ))}
          </List>
        )}
      </Container>
    </div>
  );
}
