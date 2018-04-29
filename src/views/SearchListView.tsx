import * as React from "react";
import { Text, View, TouchableOpacity, Alert } from "react-native";
import SearchBar, { SearchBarStyles } from "../uiComponent/SearchBar";
import Color from "../res/Color";
import RefreshListView, { RefreshState } from "../uiComponent/RefreshListView";
import ArticalListItem, {
  ArticalListBean
} from "../uiComponent/ArticalListItem";
import { quertArtlicalList } from "./Api";
import HttpUtlis from "../utlis/Http";

interface State {
  listData: ArticalListBean[];
  refreshState: number;
  keyword: string;
}
export default class SearchListView extends React.Component<any, State> {
  pageNum:number=0
  constructor(props: any) {
    super(props);
    this.state = { listData: [], refreshState: RefreshState.Idle, keyword: "" };
  }
  componentDidMount() {
    this.searchArtical();
  }

  searchArtical =  () => {
    HttpUtlis.getPost(quertArtlicalList(this.pageNum),{k:this.state.keyword},(response:any)=>{
        console.log("请求返回值",response)
    })
    
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
