const { ConfidentialClientApplication } = require('@azure/msal-node');
const express = require('express');
const app = express();

// MSAL Client configuration
const msalClient = new ConfidentialClientApplication({
  auth: {
    clientId: process.env.AAD_APP_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${process.env.AAD_APP_TENANT_ID}`,
    clientSecret: process.env.AAD_APP_SECRET_VALUE,
  },
});

// On-Behalf-Of Token Exchange
const exchangeTokenForGraphToken = async (teamsToken) => {
  try {
    const oboRequest = {
      oboAssertion: teamsToken,
      scopes: ["https://graph.microsoft.com/.default"],
    };
    const response = await msalClient.acquireTokenOnBehalfOf(oboRequest);
    console.log("Access token for Microsoft Graph:", response.accessToken);
    return response.accessToken;
  } catch (error) {
    console.error("Error in token exchange:", error);
    throw error;
  }
};

// API Route to handle the OBO flow
app.post('/exchange-token', async (req, res) => {
  const teamsToken = req.headers.authorization?.split(' ')[1];
  if (!teamsToken) {
    return res.status(400).send('Authorization token is missing');
  }

  try {
    const graphToken = await exchangeTokenForGraphToken(teamsToken);
    res.json({ accessToken: graphToken });
  } catch (error) {
    res.status(500).send('Token exchange failed');
  }
});

// Start the server
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
