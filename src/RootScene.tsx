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
import SearchListView from "./views/SearchListView";
import { ProjectTypeView } from "./views/Project/ProjectTypeView";
import ProjectList from "./views/Project/ProjectList";
import { UserView } from "./views/User/UserView";
import LoginView from "./views/Login/LoginView";
import RegisterView from "./views/Login/RegisterView";
import { Provider } from "react-redux";
import store from "./Store";
import { AppDefendView, AppStatus } from "./base";
export default class RootView extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppDefendView
          appStatus={new AppStatus()}
          isLoading={false}
          name={new AppStatus().name}
          message={new AppStatus().message}
        >
          <Navigator />
        </AppDefendView>
      </Provider>
    );
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
    },
    ProjectType: {
      screen: ProjectTypeView,
      navigationOptions: {
        tabBarLabel: "项目",
        tabBarIcon: ({ focused, tintColor }: any) => {
          return <TabItem focused={focused} icon="explore" />;
        }
      }
    },
    User: {
      screen: UserView,
      navigationOptions: {
        tabBarLabel: "用户",
        tabBarIcon: ({ focused, tintColor }: any) => {
          return <TabItem focused={focused} icon="person" />;
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
  HotTag: { screen: HotTagView },
  SearchList: { screen: SearchListView },
  LoginView: { screen: LoginView },
  Register: { screen: RegisterView }
},{
  navigationOptions:{
    headerTitleStyle:{color:'white',alignSelf:'center'},
    headerStyle:{backgroundColor:Color.primary}
  }
});
