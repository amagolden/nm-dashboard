import "../styles/ChartWidget.css";

import { PieChart } from "@fluentui/react-charting";
import { Text, Button, ToggleButton } from "@fluentui/react-components";
import {
  ArrowRight16Filled,
  DataPie24Regular,
  MoreHorizontal32Regular,
} from "@fluentui/react-icons";
import { BaseWidget } from "@microsoft/teamsfx-react";

import { piePoints } from "../services/seedService";

export default class SeedWidget extends BaseWidget {
  async getData() {
    return { data: piePoints() };
  }

  header() {
    return (
      <div>
        <DataPie24Regular />
        <Text>Seed Distribution</Text>
        <Button icon={<MoreHorizontal32Regular />} appearance="transparent" />
      </div>
    );
  }

  body() {
    return (
      <div>
        {this.state.data && (
          <div className="area-chart">
            <PieChart data={this.state.data} />
          </div>
        )}
      </div>
    );
  }
}
