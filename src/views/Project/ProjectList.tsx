import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Alert
} from "react-native";
import * as React from "react";
import RefreshListView, {
  RefreshState,
  RefreshType
} from "../../uiComponent/RefreshListView";
import { ProjectItem, ProjectDetails } from "./ProjectItem";
import HttpUtlis from "../../utlis/Http";
import Api, { queryProjectDetails } from "../Api";
interface State {
  projectData: ProjectDetails[];
  refreshState: number;
}
interface Props {
  cid: number;
}

export class ProjectList extends React.Component<Props, State> {
  pageNum: number = 1;
  pageSize: number = 20;

  constructor(props: any) {
    super(props);
    this.state = {
      projectData: new Array<ProjectDetails>(),
      refreshState: RefreshState.Idle
    };
  }
  componentDidMount() {
    this.updateData(RefreshType.ReSet);
  }
  renderItem = ({ item }: any) => {
    return <ProjectItem projectData={item} />;
  };
  updateData = (type: RefreshType) => {
    this.pageNum = type == RefreshType.ReSet ? 0 : ++this.pageNum;
    this.setState({
      refreshState:
        type == RefreshType.ReSet
          ? RefreshState.HeaderRefreshing
          : RefreshState.FooterRefreshing
    });
    HttpUtlis.getRequest(
      queryProjectDetails(this.pageNum, this.props.cid),
      (response: any) => {
        this.setState({
          projectData: response.datas,
          refreshState:
            type == RefreshType.ReSet
              ? RefreshState.Idle
              : response.datas.length < this.pageSize
                ? RefreshState.NoMoreData
                : RefreshState.Idle
        });
      }
    );
  };

  render() {
    return (
      <RefreshListView
        data={this.state.projectData}
        refreshState={this.state.refreshState}
        renderItem={this.renderItem}
        keyExtractor={(item) => {
            return item.id.toString()}}
        onHeaderRefresh={() => this.updateData(RefreshType.ReSet)}
        onFooterRefresh={() => this.updateData(RefreshType.LoadMore)}
      />
    );
  }
}
