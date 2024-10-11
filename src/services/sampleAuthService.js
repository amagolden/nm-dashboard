import { Client } from "@microsoft/microsoft-graph-client";
import "isomorphic-fetch"; // Ensure fetch is available in all environments
import { getAuthTokenWithSSO } from '../internal/auth';

export const fetchUserDataWithSSO = async () => {
  const token = await getAuthTokenWithSSO();

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
};
