import * as React from "react";
import { Text, FlatList } from "react-native";
import KnowListItem, { KnowItemBean } from "../../uiComponent/KnowListItem";
import Api from "../Api";
interface State {
  data: KnowItemBean[];
}
export default class KnowSystemView extends React.Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: [new KnowItemBean(), new KnowItemBean()]
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = async () => {
    try {
      let response = await fetch(Api.knowSystem);
      let json = await response.json();
      this.setState({ data: json.data });
    } catch (error) {}
  };
  renderItem = ({ item }: any): any => {
    return <KnowListItem data={item} />;
  };
  render() {
    return <FlatList data={this.state.data} renderItem={this.renderItem} />;
  }
}
