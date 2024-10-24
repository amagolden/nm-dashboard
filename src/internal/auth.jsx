import { PublicClientApplication } from '@azure/msal-browser';
import { app, authentication } from "@microsoft/teams-js";

export const getAuthTokenSDK = async () => {
  
  //request token via SDK for signed in user
  try {
    await app.initialize(); // Initialize the Teams SDK

    app.getContext((context) => {
      console.log('Teams context:', context);
    });

    return new Promise((resolve, reject) => {
      authentication.getAuthToken({
        successCallback: (token) => {
          console.log("Token acquired successfully:", token);
          resolve(token);
        },
        failureCallback: (error) => {
          console.error("Failed to get Teams auth token:", error);
          reject(error);
        },
      });
    });
  } catch (error) {
    console.error('Error initializing Teams SDK or getting token:', error);
    return null;
  }
};

/*const SDKtoken = await getAuthTokenSDK();

if (SDKtoken) {
  const response = await fetch('https://your-backend-api.com/exchange-token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SDKtoken}`,
    },
  });
  const data = await response.json();
  console.log('Access token from OBO flow:', data.accessToken);
}*/

export const getAuthToken = async (SDKtoken) => {
  
  const msalInstance = new PublicClientApplication({
    auth: {
      clientId: "3e1cfe0e-bc58-42a4-b54e-d1f3d1330e06",
      redirectUri: "https://localhost:53000/auth-end/",
    },
  });
  
  //initialize MSAL
  await msalInstance.initialize();  
  
  //get active account
  const account = msalInstance.getActiveAccount();
  if (!account) {
    console.error('No active account found. Consider interactive login.');
    return null;
  }

  // Set the active account if found
  msalInstance.setActiveAccount(account);

  try {
    const response = await msalInstance.acquireTokenSilent({
      scopes: ['https://graph.microsoft.com/.default'],
    });

    return response.accessToken;
  } catch (error) {
    console.error('Error acquiring token:', error);
    return null;
  }
};

export const getAuthTokenSSO = async () => {
  
  try {
    const SDKtoken = await getAuthTokenSDK(); // Await SDK token
    if (SDKtoken) {
      const graphToken = await getAuthToken(SDKtoken); // Await MSAL token using SDK token
      return graphToken;
    } else {
      console.error("Failed to acquire SDK token.");
      return null;
    }
  } catch (error) {
    console.error("Error in SSO flow:", error);
    return null;
  }

};

/*import { Providers, ProviderState } from "@microsoft/mgt-react";
import { TeamsFxProvider } from "@microsoft/mgt-teamsfx-provider";
import { TeamsUserCredential } from "@microsoft/teamsfx";
import { TeamsFxContext } from "./context";


export const getAuthTokenWithSSO = async () => {
    
    const authConfig = {
      clientId: "3e1cfe0e-bc58-42a4-b54e-d1f3d1330e06",
      initiateLoginEndpoint: "https://localhost:53000",
    };
    
    console.log("defining auth config", authConfig);

    const scopes = ["User.Read"];

    console.log("requesting credential");
    const credential = new TeamsUserCredential(authConfig);
    const provider = new TeamsFxProvider(credential, scopes);

    try {
      const accessToken = await provider.getAccessToken();
      console.log("Access Token:", accessToken);
      // Use the access token to call Microsoft Graph API
    } catch (error) {
      if (error.code === "ErrorWithCode.UiRequiredError") {
        // Handle the error (e.g., display a message, redirect to login)
        console.error("User login required");
        // Trigger interactive login (if applicable):
      } else {
        console.error("Error acquiring access token:", error);
      }
    }
};*/

/*import { authentication, app } from "@microsoft/teams-js";

export const getAuthTokenWithSSO = async () => {
  
  try {
    // Initialize the Teams SDK before using any of its features
    console.log("initializing SDK...");
    await app.initialize();
    console.log("initialized!");

    const tokenRequest = {
      scopes: ["User.Read"], 
    };

    console.log("requesting token from Graph", tokenRequest);

    const token = await authentication.getAuthToken(tokenRequest);

    if (!token) {
      throw new Error("Token acquisition failed");
    }

    console.log("SSO Token acquired:", token);

    // Decode and log the 'aud' claim in the token
    const tokenParts = token.split('.');
    const payload = JSON.parse(atob(tokenParts[1])); // Decode the JWT payload
    console.log("Decoded Token Payload:", payload);
    console.log("Audience (aud) claim:", payload.aud); // Log the 'aud' claim
    

    return token;
  } catch (error) {
    console.error("Error acquiring SSO token", error);
    return null; // Return null if token acquisition fails
  }
};*/

