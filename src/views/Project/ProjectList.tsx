import {
  TouchableOpacity,
  StyleProp,
  TextStyle,
  ViewStyle
} from "react-native";
import * as React from "react";
import RefreshListView, {
  RefreshType
} from "../../uiComponent/RefreshListView";
import { ProjectItem } from "./ProjectItem";
import { connect } from "react-redux";
import { HttpAction, HTTP_BEFORE } from "../../dataFlow/action";
import { queryProjectDetails } from "../Api";
import { bundleToComponent } from "redux-arena/tools";
import reducer, { State as state, ProjectListState } from "./dataFlow/reducer";
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
        // onFooterRefresh={() => this.props.refreshData(1)}
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

const mapDispatchToProps = (dispatch: any, ownProps: Props) => {
  return {
    refreshData: (pageNum: number) => {
      //dispatch({ type: HTTP_BEFORE ,meta:ownProps.cid});
      dispatch({
        ...new HttpAction(
          "GET",
          queryProjectDetails(pageNum, ownProps.cid),
          ownProps.cid
        )
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectList);
