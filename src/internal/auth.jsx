import { authentication, app } from "@microsoft/teams-js";

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
};