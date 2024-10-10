// internal/singletonContext.ts

import { TeamsUserCredential } from "@microsoft/teamsfx";

class TeamsUserCredentialContext {
  private static instance: TeamsUserCredentialContext;
  private credential: TeamsUserCredential | null = null;

  private constructor() {
    // Private constructor ensures singleton instance
  }

  // Static method to get the singleton instance of the class
  public static getInstance(): TeamsUserCredentialContext {
    if (!TeamsUserCredentialContext.instance) {
      TeamsUserCredentialContext.instance = new TeamsUserCredentialContext();
    }
    return TeamsUserCredentialContext.instance;
  }

  // Method to set the credential if it hasn't been set already
  public setCredential(credential: TeamsUserCredential) {
    if (!this.credential) {
      this.credential = credential;
    }
  }

  // Method to get the credential instance
  public getCredential(): TeamsUserCredential {
    if (!this.credential) {
      // If the credential has not been set, create a new instance
      this.credential = new TeamsUserCredential();
    }
    return this.credential;
  }
}

export { TeamsUserCredentialContext };
