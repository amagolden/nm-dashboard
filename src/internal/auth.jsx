import { authentication, app } from "@microsoft/teams-js";

export const getAuthTokenWithSSO = async () => {
  
  try {
    // Initialize the Teams SDK before using any of its features
    await app.initialize();
    
    const token = await authentication.getAuthToken({
      resources: ["https://graph.microsoft.com"], // Requesting Microsoft Graph permissions
    });

    if (!token) {
      throw new Error("Token acquisition failed");
    }

    console.log("SSO Token acquired:", token);
    return token;
  } catch (error) {
    console.error("Error acquiring SSO token", error);
    return null; // Return null if token acquisition fails
  }

  /*// Initialize the Teams SDK
  authentication.initialize();

  try {
    const token = await authentication.getAuthToken({
      resources: ["https://graph.microsoft.com"], // Request permissions for Microsoft Graph
    });

    console.log("SSO Token: ", token);
    return token; // Return the token
  } catch (error) {
    console.error("Error acquiring SSO token", error);
    return null; // Handle error by returning null
  }*/
};
