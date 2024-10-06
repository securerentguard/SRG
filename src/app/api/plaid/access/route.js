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
      const { institution_id, initial_products } = req.body;

      // Step 1: Create a Sandbox public token
      const publicTokenRequest = {
        institution_id: institution_id || 'ins_109508', // Default to a Plaid Sandbox institution
        initial_products: initial_products || ['transactions'], // Default to 'transactions'
      };

      const publicTokenResponse = await plaidClient.sandboxPublicTokenCreate(publicTokenRequest);
      const publicToken = publicTokenResponse.data.public_token;

      // Step 2: Exchange public token for access token
      const exchangeTokenResponse = await plaidClient.itemPublicTokenExchange({
        public_token: publicToken,
      });

      const accessToken = exchangeTokenResponse.data.access_token;

      // Return the access token
      res.status(200).json({ access_token: accessToken });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to generate or exchange token' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}