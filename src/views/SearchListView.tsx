import * as React from "react";
import { Text, View, TouchableOpacity, Alert } from "react-native";
import SearchBar, { SearchBarStyles } from "../uiComponent/SearchBar";
import Color from "../res/Color";
import RefreshListView, { RefreshState } from "../uiComponent/RefreshListView";
import ArticalListItem, {
  ArticalListBean
} from "../uiComponent/ArticalListItem";
import { quertArtlicalList } from "./Api";

interface State {
  listData: ArticalListBean[];
  refreshState: number;
  keyword: string;
}
export default class SearchListView extends React.Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = { listData: [], refreshState: RefreshState.Idle, keyword: "" };
  }
  componentDidMount() {
    this.searchArtical();
  }

  searchArtical = async () => {
    /*  if (this.state.keyword.trim().length == 0) {
      return;
    } */
    try {
      let response = await fetch(quertArtlicalList(this.state.keyword), {
        method: "POST"
      });
      let json = await response.json();
      console.log("数据", json);

      let data = json.data.datas;
      console.log("数据", data);

      this.setState({
        refreshState:
          data.length >= 20 ? RefreshState.Idle : RefreshState.NoMoreData,
        listData: data
      });
      console.log("数据", data);
    } catch (error) {
      this.setState({ refreshState: RefreshState.Failure });
    }
  };
  render() {
    return (
      <View>
        <SearchBar
          placeholder="请输入关键字"
          cancelText="取消"
          value={this.state.keyword}
          onCancel={() => {
            this.props.navigation.goBack();
          }}
          onSubmit={value => {
            this.setState({ keyword: value });
            console.log(this.state.keyword);
            this.searchArtical();
          }}
        />
        <RefreshListView
          data={this.state.listData}
          refreshState={this.state.refreshState}
          renderItem={({ item }: any) => {
            return <ArticalListItem data={item} clickItem={() => {}} />;
          }}
        />
      </View>
    );
  }
}
