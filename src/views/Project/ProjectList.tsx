import { TouchableOpacity, StyleProp, TextStyle } from "react-native";
import * as React from "react";
import RefreshListView, {
  RefreshType
} from "../../uiComponent/RefreshListView";
import { ProjectItem } from "./ProjectItem";
import { connect } from "react-redux";
import { HttpAction, HTTP_BEFORE } from "../../dataFlow/action";
import { queryProjectDetails } from "../Api";

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
        onHeaderRefresh={() => this.props.refreshData(RefreshType.ReSet)}
        onFooterRefresh={() => this.props.refreshData(RefreshType.LoadMore)}
      />
    );
  }
}

const mapStateToProps = (state: any, ownProps: Props) => {
  console.log("state", state);
  return {
    projectList: state.project.projectList,
    refreshState: state.project.refreshState
  };
};

const mapDispatchToProps = (dispatch: any, ownProps: Props) => {
  return {
    refreshData: (pageNum: number) => {
      dispatch({ type: HTTP_BEFORE });
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
