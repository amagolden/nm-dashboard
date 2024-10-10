// internal/login.ts

import { TeamsUserCredential } from "@microsoft/teamsfx";

export const loginAction = async (scopes: string[]): Promise<void> => {
  try {
    // Instantiate a credential object to manage the Teams login
    const credential = new TeamsUserCredential();
    
    // Check if the user is already signed in by trying to retrieve an access token
    await credential.getToken(scopes);
  } catch (error) {
    if (error.code === 'UiRequiredError') {
      // If the user is not signed in or requires interactive sign-in, trigger login
      await credential.login(scopes);
    } else {
      console.error('Error during Teams login:', error);
      throw error;  // Rethrow to handle in calling function
    }
  }
};
