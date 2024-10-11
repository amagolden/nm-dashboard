import { BaseDashboard } from "@microsoft/teamsfx-react";

import ChartWidget from "../widgets/ChartWidget";
import ListWidget from "../widgets/ListWidget";
import SampleWidget from "../widgets/SampleWidget";
import SampleAuthWidget from "../widgets/SampleAuthWidget";

export default class SampleDashboard extends BaseDashboard {
  layout() {
    return (
      <>
        <ListWidget />
        <ChartWidget />
        <SampleWidget />
        <SampleAuthWidget />
      </>
    );
  }
}
