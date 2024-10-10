/**
  * Retrieve sample data
  * @returns data for list widget
  */
import {TeamsUserCredentialContext} from "../internal/singletonContext";
import {
  createMicrosoftGraphClientWithCredential,
  TeamsUserCredential,
  } from "@microsoft/teamsfx";
import {loginAction} from '../internal/login';

export const getAuthData = async (): Promise<ListModel[]> => {
  await loginAction(["User.Read"]);
  let credential = TeamsUserCredentialContext.getInstance().getCredential();
  const graphClient = createMicrosoftGraphClientWithCredential(credential, 
  ["User.Read",
  ]);
  const me = await graphClient.api("/me").get();
  return [
    {
      id: me.id,
      title: me.displayName,
      content: me.mail,
    },
  ];
  // {
  //   id: "id1",
  //   title: "Sample title",
  //   content: "Sample description",
  // },
  // {
  //   id: "id2",
  //   title: "Sample title",
  //   content: "Sample description",
  // },
  // {
  //   id: "id3",
  //   title: "Sample title",
  //   content: "Sample description",
  // },
}