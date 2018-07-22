import { TouchableOpacity, StyleProp, TextStyle } from "react-native";
import * as React from "react";
import RefreshListView, {
  RefreshType
} from "../../uiComponent/RefreshListView";
import { ProjectItem } from "./ProjectItem";
import { connect } from "react-redux";
import { queryProjectDetails } from "../Api";
import { ProjectListState } from "./dataFlow/reducer";
import { NetRequestAction, NetRequestBean, AppAction, NetRequestSuccessAT } from "../../base";
import { Dispatch } from "redux";
interface Props {
  clickItem: Function;
  projectList: Array<String>;
  cid: number;
  style: StyleProp<TextStyle>;
  refreshState: number;
  refreshData: Function;
}

class ProjectList extends React.PureComponent<Props> {
  pageNum: number = 1;
  pageSize: number = 20;

  constructor(props: Props) {
    super(props);
    console.log("props", this.props);
  }
  componentDidMount() {
    this.props.refreshData(1, this.props.cid);
  }
  renderItem = ({ item }: any) => {
    return (
      <TouchableOpacity
        onPress={() => this.props.clickItem && this.props.clickItem(item.id)}
      >
        <ProjectItem projectData={item} />
      </TouchableOpacity>
    );
  };
  render() {
    console.log("render", this.props);
    return (
      <RefreshListView
        data={this.props.projectList}
        refreshState={this.props.refreshState}
        renderItem={this.renderItem}
        keyExtractor={item => {
          return item.id.toString();
        }}
        onHeaderRefresh={() => {
          console.log("下拉刷新");
          this.props.refreshData(1);
        }}
        onFooterRefresh={() =>
          this.props.refreshData(++this.pageNum)
        }
      />
    );
  }
}

const mapStateToProps = (state: any, ownProps: Props) => {
  console.log("state", state);
  const projectState: ProjectListState =
    state.projectMap.projectListMap.get(ownProps.cid) || new ProjectListState();
  console.log("projectState", projectState);

  return {
    projectList: projectState.projectList,
    refreshState: projectState.refreshState
  };
};

const mapDispatchToProps = (dispatch: Dispatch, ownProps: Props) => {
  return {
    refreshData: (pageNum: number, refreshType: RefreshType) => {
      dispatch({
        ...new NetRequestAction(new AppAction(NetRequestSuccessAT),
          {
            ...new NetRequestBean(
              "GET",
              queryProjectDetails(pageNum, ownProps.cid),
              {pageNum:pageNum,cid:ownProps.cid}
            )
          },
          false
        )
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectList);
