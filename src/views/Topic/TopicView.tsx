import * as React from "react";
import ArticalListItem, {
  ArticalListBean
} from "../../uiComponent/ArticalListItem";
import { Text, View, TouchableOpacity, Alert } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Color from "../../res/Color";
import Swiper from "react-native-swiper";
import TabView, { ScrollableTabBar } from "react-native-scrollable-tab-view";
import RefreshListView, {
  RefreshState
} from "../../uiComponent/RefreshListView";
import Api, { getKnowSystemArticalList } from "../Api";
import TopicList from "./TopicList";

export class TabItemBean {
  id: number;
  name: string;
  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}
interface Props {
  data: TabItemBean[];
  navigation: any;
}
interface State {
  data: Map<number, ArticalListBean[]>;
  initPage: number;
  listState: Map<number, number>;
}
export default class TopicView extends React.Component<Props, State> {
  static navigationOptions = ({ navigation }: any) => {
    let { params } = navigation.state;
    return {
      title: params.title,
      headerRight: (
        <View style={{ flexDirection: "row", marginRight: 8 }}>
          <TouchableOpacity
            style={{ marginRight: 8 }}
            onPress={() => {
              Alert.alert("点击搜索");
            }}
          >
            <Icon name="search" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginRight: 8 }}
            onPress={() => {
              Alert.alert("点击分享");
            }}
          >
            <Icon name="share" size={24} color="white" />
          </TouchableOpacity>
        </View>
      ),
      headerStyle: { backgroundColor: Color.primary }
    };
  };
  
  constructor(props: any) {
    super(props);

    this.state = {
      data: new Map<number, ArticalListBean[]>(),
      initPage: 0,
      listState: new Map<number, number>()
    };
  }

  render() {
    let views = this.props.navigation.state.params.tabItem.map(
      (item: TabItemBean) => {
        return (
          <View tabLabel={item.name} key={item.id}>
            <TopicList
              id={item.id}
              clickItem={(data: ArticalListBean) => {
                this.props.navigation.navigate("ArticalDetails", {
                  link: data.link,
                  title: data.title
                });
              }}
            />
          </View>
        );
      }
    );
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
