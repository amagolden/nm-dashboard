import "../styles/ListWidget.css";

import { Button, Text } from "@fluentui/react-components";
import { List28Filled, MoreHorizontal32Regular } from "@fluentui/react-icons";
import { BaseWidget } from "@microsoft/teamsfx-react";
import { getAuthData } from "../services/authService";

export default class AuthWidget extends BaseWidget {
  async getData() {
    return { data: getAuthData() };
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
