import { useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

export default function Transactions() {
  const [transactions, setTransactions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch transactions from your API
    const fetchTransactions = async () => {
      try {
        const response = await fetch("/api/plaid/transactions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            access_token: "your-access-token", // Use the real access token here
            cursor: null,
          }),
        });
        const data = await response.json();
        setTransactions(data.transactions);
      } catch (err) {
        setError("Failed to fetch transactions");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box>
      <Typography variant="h6">Transaction History</Typography>
      <ul>
        {transactions?.added?.map((transaction) => (
          <li key={transaction.transaction_id}>
            {transaction.name}: {transaction.amount}
          </li>
        ))}
      </ul>
    </Box>
  );
}
