import "../styles/ListWidget.css";

import { Button, Text } from "@fluentui/react-components";
import { List28Filled, MoreHorizontal32Regular } from "@fluentui/react-icons";
import { BaseWidget } from "@microsoft/teamsfx-react";

import { getDateData } from "../services/dateService";

export default class DateWidget extends BaseWidget {
  async getData() {
    return { data: getDateData() };
  }

  header() {
    return (
      <div>
        <List28Filled />
        <Text>Key Timeline</Text>
        <Button icon={<MoreHorizontal32Regular />} appearance="transparent" />
      </div>
    );
  }

  body() {
    return (
      <div className="list-body">
        {this.state.data?.map((t) => {
          return (
            <div key={`${t.id}-div`}>
              <div className="divider" />
              <Text className="title">{t.date}</Text>
              <Text className="content">{t.detail}</Text>
            </div>
          );
        })}
      </div>
    );
  }
}
