import { Client } from "@microsoft/microsoft-graph-client";
import "isomorphic-fetch";
import { getAuthTokenWithSSO } from '../internal/auth';

export const fetchUserDataWithSSO = async () => {
  try {
    // Get the SSO token
    const token = await getAuthTokenWithSSO();
    if (!token) throw new Error("Token not acquired. Unable to fetch user data.");

    // Call backend to exchange token
    const response = await fetch("http://localhost:3001/exchange-token", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    const graphToken = data.accessToken;

    // Initialize the Microsoft Graph client
    const client = Client.init({
      authProvider: (done) => {
        done(null, graphToken);
      },
    });

    // Fetch user data
    const user = await client.api("/me").get();
    console.log("User data:", user);
    return [
      {
        id: user.id,
        title: user.displayName,
        content: user.mail,
      },
    ];
  } catch (error) {
    console.error("Error fetching data from Microsoft Graph", error);
    return null;
  }
};

/*const { ConfidentialClientApplication } = require('@azure/msal-node');
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
      oboAssertion: teamsToken, // The token from Teams SDK
      scopes: ["https://graph.microsoft.com/.default"], // Requested scopes
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
  const teamsToken = req.headers.authorization.split(' ')[1]; // Extract token from headers
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
});*/


/*import { Client } from "@microsoft/microsoft-graph-client";
import "isomorphic-fetch"; // Ensure fetch is available in all environments
import { getAuthTokenWithSSO } from '../internal/auth';
const { ConfidentialClientApplication } = require('@azure/msal-browser');
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
      oboAssertion: teamsToken, // The token from Teams SDK
      scopes: ["https://graph.microsoft.com/.default"], // Requested scopes
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
  const teamsToken = req.headers.authorization.split(' ')[1]; // Extract token from headers
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


export const fetchUserDataWithSSO = async () => {
  
  try {
    // Get the SSO token
    const token = await getAuthTokenWithSSO();

    if (!token) {
      throw new Error("Token not acquired. Unable to fetch user data.");
    }

    // Initialize the Microsoft Graph client
    const client = Client.init({
      authProvider: (done) => {
        done(null, token); // Pass the SSO token to the Microsoft Graph client
      },
    });

    try {
      const user = await client.api("/me").get();
      console.log("User data:", user);
      return [
        {
          id: user.id,
          title: user.displayName,
          content: user.mail,
        },
      ];
    } catch (error) {
      console.error("Error fetching data from Microsoft Graph", error);
    }
  } catch (error) {
    console.error("Error fetching data from Microsoft Graph", error);
  }
};*/

/*import { Client } from "@microsoft/microsoft-graph-client";
import "isomorphic-fetch"; // Ensure fetch is available in all environments
import { getAuthTokenWithSSO } from '../internal/auth';

export const fetchUserDataWithSSO = async () => {
  
  try {
    // Get the SSO token from Teams SDK
    const token = await getAuthTokenWithSSO();

    if (!token) {
      throw new Error("Token not acquired. Unable to fetch user data.");
    }

    // Send the SDK token to the backend to exchange it for a Microsoft Graph token
    const graphTokenResponse = await fetch('/api://localhost:53000/3e1cfe0e-bc58-42a4-b54e-d1f3d1330e06/exchange-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Send the SSO token
      }
    });

    const graphTokenData = await graphTokenResponse.json();
    const graphToken = graphTokenData.accessToken;

    // Initialize the Microsoft Graph client with the Graph token
    const client = Client.init({
      authProvider: (done) => {
        done(null, graphToken); // Use the token received from backend OBO flow
      },
    });

    try {
      const user = await client.api("/me").get();
      console.log("User data:", user);
      return [
        {
          id: user.id,
          title: user.displayName,
          content: user.mail,
        },
      ];
    } catch (error) {
      console.error("Error fetching data from Microsoft Graph", error);
    }
  } catch (error) {
    console.error("Error fetching data from Microsoft Graph", error);
  }
};*/


    // Fetch data from a specific Excel file
    // Replace {item-id} and {worksheet-id} with the correct IDs for your Excel file and worksheet
    /*const range = await client
      .api('/me/drive/items/{item-id}/workbook/worksheets/{worksheet-id}/range(address=\'A1:D10\')') // Adjust the range as needed
      .get();
    
    console.log("Excel data:", range);

    // Return the formatted data
    return range.values; // This will return an array of arrays containing the Excel data

  } catch (error) {
    console.error("Error fetching data from Microsoft Graph", error);
    return []; // Return an empty array in case of an error
  }*/

  /*const token = await getAuthTokenWithSSO();

  if (token) {
    const client = Client.init({
      authProvider: (done) => {
        done(null, token); // Pass the SSO token to Microsoft Graph client
      },
    });

    try {
      const user = await client.api("/me").get();
      console.log("User data:", user);
      return [
        {
          id: user.id,
          title: user.displayName,
          content: user.mail,
        },
      ];
    } catch (error) {
      console.error("Error fetching data from Microsoft Graph", error);
    }
  }
};*/
