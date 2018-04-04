import * as React from "React";
import ArticalListItem, {
  ArticalListBean
} from "../../uiComponent/ArticalListItem";
import RefreshListView, {
  RefreshState
} from "../../uiComponent/RefreshListView";
import { getKnowSystemArticalList } from "../Api";

interface Props {
  id: number;
}
interface State {
  data: ArticalListBean[];
  listStatus: number;
  pageNum: 1;
  pageSize: 20;
}
export default class TopicList extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: new Array<ArticalListBean>(),
      listStatus: RefreshState.Idle,
      pageNum: 1,
      pageSize: 20
    };
  }

  componentDidMount() {
    this.refreshData(this.props.id);
  }

  refreshData = async (id: number) => {
    try {
      this.setState({
          listStatus:RefreshState.HeaderRefreshing
      });
      let response = await fetch(getKnowSystemArticalList(id));
      let json = await response.json();
      this.setState({
        data: json.data.datas
      });
      this.setState({
        listStatus:RefreshState.Idle
    });
    } catch (error) {
      console.log("请求出错", error);
      this.setState({
        listStatus:RefreshState.Failure
    });
    }
  };
  renderItem = ({ item }: any) => {
    return <ArticalListItem data={item} />;
  };
  render() {
    return (
      <RefreshListView
        data={this.state.data}
        refreshState={this.state.listStatus}
        onHeaderRefresh={() => {
          this.refreshData(this.props.id);
        }}
        renderItem={this.renderItem}
      />
    );
  }
}
