import "./App.css";

import { HashRouter as Router, Navigate, Route, Routes } from "react-router-dom";

import {
  FluentProvider,
  Spinner,
  teamsLightTheme,
  teamsDarkTheme,
  teamsHighContrastTheme,
} from "@fluentui/react-components";
import { useTeams } from "@microsoft/teamsfx-react";

import SampleDashboard from "./frontend/dashboards/SampleDashboard";
import { TeamsFxContext } from "./frontend/internal/context";
import Privacy from "./frontend/Privacy";
import TabConfig from "./frontend/TabConfig";
import TermsOfUse from "./frontend/TermsOfUse";

/**
 * The main app which handles the initialization and routing
 * of the app.
 */
export default function App() {
  const { loading, themeString } = useTeams()[0];

  return (
    <TeamsFxContext.Provider value={{ themeString }}>
      <FluentProvider
        id="fluent-provider"
        theme={
          themeString === "dark"
            ? teamsDarkTheme
            : themeString === "contrast"
            ? teamsHighContrastTheme
            : teamsLightTheme
        }
      >
        <Router>
          {loading ? (
            <Spinner id="spinner" />
          ) : (
            <Routes>
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/termsofuse" element={<TermsOfUse />} />
              <Route path="/tab" element={<SampleDashboard />} />
              <Route path="/config" element={<TabConfig />} />
              <Route path="*" element={<Navigate to={"/tab"} />} />
            </Routes>
          )}
        </Router>
      </FluentProvider>
    </TeamsFxContext.Provider>
  );
}
