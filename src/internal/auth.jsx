import { authentication } from "@microsoft/teams-js";

export const getAuthTokenWithSSO = async () => {
  // Initialize the Teams SDK
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
  }
};
