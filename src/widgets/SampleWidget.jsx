import "../styles/ListWidget.css";

import { Button, Text } from "@fluentui/react-components";
import { List28Filled, MoreHorizontal32Regular } from "@fluentui/react-icons";
import { BaseWidget } from "@microsoft/teamsfx-react";

import { getSampleData } from "../services/sampleService";

export default class SampleWidget extends BaseWidget {
  async getData() {
    return { data: getSampleData() };
  }

  header() {
    return (
      <div>
        <List28Filled />
        <Text>Sample</Text>
        <Button icon={<MoreHorizontal32Regular />} appearance="transparent" />
      </div>
    );
  }

  body() {
    return (
        <div>
            <Text className="content">{this.state.data?.content}</Text>
        </div>
    );
  }

  footer() {
    return <Button appearance="primary">View Details</Button>;
  }
  
}
