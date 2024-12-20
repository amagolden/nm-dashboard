import { BaseDashboard } from "@microsoft/teamsfx-react";

import ChartWidget from "../widgets/ChartWidget";
import ListWidget from "../widgets/ListWidget";
import DateWidget from "../widgets/DateWidget";
import SeedWidget from "../widgets/SeedWidget";

import React, { useState } from 'react';

import { PageLayout } from '../PageLayout';

import '../App.css';

  /**
* Renders information about the signed-in user or a button to retrieve data about the user
*/
  /*function ProfileContent() {
    const { instance, accounts } = useMsal();
    const [graphData, setGraphData] = useState(null);

    function RequestProfileData() {
        // Silently acquires an access token which is then attached to a request for MS Graph data
        if (accounts[0]) {  // Check if accounts[0] exists
          instance
              .acquireTokenSilent({
                  ...loginRequest,
                  account: accounts[0],
              })
              .then((response) => {
                  callMsGraph(response.accessToken).then((response) => setGraphData(response));
              });
      }
  };

   return (
      <>
          <h5 className="card-title">Welcome {accounts[0]?.name || "User"}</h5>
          <br/>
          {graphData ? (
              <ProfileData graphData={graphData} />
          ) : (
              <Button variant="secondary" onClick={RequestProfileData}>
                  Request Profile Information
              </Button>
          )}
      </>
    )
  }*/

  export default class SampleDashboard extends BaseDashboard {
    layout() {
      return (
        <>
          <PageLayout />
          <DateWidget />
          <ChartWidget />
          <ListWidget />
          <SeedWidget />
        </>
      );
    }
  }
