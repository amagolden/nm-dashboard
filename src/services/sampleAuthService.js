import { Client } from "@microsoft/microsoft-graph-client";
import "isomorphic-fetch"; // Ensure fetch is available in all environments
import { getAuthTokenSDK } from '../internal/auth';

export const fetchUserDataWithSSO = async () => {
  
  try {
    // Get the SSO token
    const token = await getAuthTokenSDK();

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
  }*/
};
