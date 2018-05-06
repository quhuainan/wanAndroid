import * as React from "react";
import RefreshListView, {
  RefreshState
} from "../../uiComponent/RefreshListView";
import ArticalListItem, {
  ArticalListBean
} from "../../uiComponent/ArticalListItem";
import Api, { quertArtlicalList } from "../Api";
import Color from "../../res/Color";
interface state {
  articalList: ArticalListBean[];
  refreshState: number;
}
export default class ArticalListView extends React.Component<any, any> {
  static navigationOptions = ({ navigation }: any) => {
    let { params } = navigation.state;
    return {
      title: params.key,
      headerStyle: { backgroundColor: Color.primary }
    };
  };

  constructor(props: any) {
    super(props);
    this.state = { articalList: [], refreshState: RefreshState.Idle };
  }
  pageNum: any = 0;
  componentDidMount() {
    this.refreshList();
  }
  refreshList = async () => {
    try {
      this.setState({
        refreshState:
          this.pageNum == 0
            ? RefreshState.HeaderRefreshing
            : RefreshState.FooterRefreshing
      });
      let response = await fetch(
        quertArtlicalList(this.props.navigation.state.params.key,this.pageNum),
        {
          method: "POST"
        }
      );
      let json = await response.json();
      let data = json.data.datas;
      this.setState({
        refreshState:
          data.length >= 20 ? RefreshState.Idle : RefreshState.NoMoreData,
        articalList: data
      });
      console.log("请求数据", json);
    } catch (error) {
      console.log("请求出错", error);
      this.setState({ refreshState: RefreshState.Failure });
    }
  };
  renderItem = ({ item }: any) => {
    console.log(item);
    return <ArticalListItem data={item} clickItem={() => {}} />;
  };
  render() {
    return (
      <RefreshListView
        data={this.state.articalList}
        renderItem={this.renderItem}
        refreshState={this.state.refreshState}
        keyExtractor={item=>{return item.id}}
        onHeaderRefresh={() => {
          this.pageNum = 0;
          this.refreshList();
        }}
        onFooterRefresh={() => {
          this.pageNum = ++this.pageNum;
          this.refreshList();
        }}
      />
    );
  }
}
