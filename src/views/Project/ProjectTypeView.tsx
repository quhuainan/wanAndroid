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
import TabView, { ScrollableTabBar } from "react-native-scrollable-tab-view";
import Color from "../../res/Color";
import HttpUtlis from "../../utlis/Http";
import Api from "../Api";
import  ProjectList  from "./ProjectList";
import { ProjectDetails } from "./ProjectItem";
interface State {
  initPage: 0;
  tabData: ProjectType[];
}

// 项目类型 bean
interface ProjectType {
  children: any[];
  courseId: number;
  id: number;
  name: string;
  order: number;
  parentChapterId: number;
  visible: number;
}

export class ProjectTypeView extends React.Component<any, State> {

  static navigationOptions = ({ navigation }: any) => ({
    headerTitle: <Text style={{ color: "white", fontSize: 16 }}>项目</Text>,

    headerStyle: { backgroundColor: Color.primary }
  });
  constructor(props: any) {
    super(props);
    this.state = { initPage: 0, tabData: [] };
  }
  componentWillMount() {
    HttpUtlis.getRequest(Api.projectType, (response: ProjectType[]) => {
      this.setState({ tabData: response });
    });
  }
  render() {
    let views = this.state.tabData.map((item: ProjectType) => {
      return (
        <ProjectList
          tabLabel={item.name}
          cid={item.id}
          clickItem={(projectDetails: ProjectDetails) => {
            this.props.navigation.navigate("ArticalDetails", {
              link: projectDetails.link,
              title: projectDetails.title
            });
          }}
          key={item.id}
        />
      );
    });
    return (
      <TabView
        tabBarBackgroundColor={Color.primary}
        tabBarUnderlineStyle={{ backgroundColor: Color.white }}
        tabBarActiveTextColor={Color.white}
        tabBarInactiveTextColor={Color.gray}
        initialPage={this.state.initPage}
        renderTabBar={() => <ScrollableTabBar />}
      >
        {views}
      </TabView>
    );
  }
}
