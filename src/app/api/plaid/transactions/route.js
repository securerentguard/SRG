import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';

const configuration = new Configuration({
  basePath: PlaidEnvironments.sandbox, // Using Sandbox environment
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
      'PLAID-SECRET': process.env.PLAID_SECRET,
    },
  },
});

const plaidClient = new PlaidApi(configuration);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { access_token, cursor } = req.body;

      // Step 1: Sync Transactions using the access token
      const syncRequest = {
        access_token: access_token,
        cursor: cursor || null, // If no cursor is provided, fetch all available transactions
      };

      const syncResponse = await plaidClient.transactionsSync(syncRequest);

      const { added, modified, removed, next_cursor } = syncResponse.data;

      // Step 2: Return the transactions and next cursor for future syncs
      res.status(200).json({
        transactions: {
          added,
          modified,
          removed,
        },
        next_cursor, // Return the next cursor for the next sync call
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to sync transactions' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
