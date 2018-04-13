import { View } from "react-native";
import * as React from "react";
import {
  StackNavigator,
  TabNavigator,
  TabBarBottom,
  NavigationScreenConfig
} from "react-navigation";
import TabItem from "./uiComponent/TabItem";
import Color from "./res/Color";
import { HomeView } from "./views/Home";
import KnowSystemView from "./views/Know/KnowSystemView";
import TopicView from "./views/Topic/TopicView";
import ArticalDetailsView from "./views/ArticalDetailsView";
import HotTagView from "./views/HotTagView";
import ArticalListView from "./views/ArticalList/ArticalListView";

export default class RootView extends React.Component {
  render() {
    return <Navigator />;
  }
}

const Tab = TabNavigator(
  {
    HomeView: {
      screen: HomeView,
      navigationOptions: {
        tabBarLabel: "首页",
        tabBarIcon: ({ focused, tintColor }: any) => {
          return <TabItem focused={focused} icon="home" />;
        }
      }
    },
    KnowSystem: {
      screen: KnowSystemView,
      navigationOptions: {
        tabBarLabel: "知识体系",
        tabBarIcon: ({ focused, tintColor }: any) => {
          return <TabItem focused={focused} icon="widgets" />;
        }
      }
    }
  },
  {
    tabBarComponent: TabBarBottom,
    tabBarPosition: "bottom",
    lazy: true,
    animationEnabled: false,
    swipeEnabled: false,
    tabBarOptions: {
      activeTintColor: Color.primary,
      inactiveBackgroundColor: Color.background,
      style: { backgroundColor: Color.white }
    }
  }
);
const Navigator = StackNavigator({
  Tab: { screen: Tab },
  Topic: { screen: TopicView },
  ArticalList: { screen: ArticalListView },
  ArticalDetails: { screen: ArticalDetailsView },
  HotTag: { screen: HotTagView }
});
