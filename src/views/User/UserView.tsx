import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
  ScrollView
} from "react-native";
import * as React from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import Octicons from "react-native-vector-icons/Octicons";

import Color from "../../res/Color";
import {
  Heading1,
  Heading2,
  Heading3,
  Paragraph
} from "../../uiComponent/Text";
interface State {
  loginStatus: boolean;
  userInfo: UserInfo;
}
class UserInfo {
  collectIds: number[] = new Array<number>();
  email?: string;
  icon?: string;
  id: number = -1;
  password?: string;
  type?: number;
  username: string = "";
}

class Setting {
  iconName: string;
  iconColor: string;
  title: string;
  read?: number;
  constructor(
    iconName: string = "bubble-chart",
    iconColor: string = Color.primary,
    title: string = "",
    read: number = 0
  ) {
    this.iconName = iconName;
    this.iconColor = iconColor;
    this.title = title;
    this.read = read;
  }
}
export class UserView extends React.Component<any, State> {
  settingList: Setting[] = [
    new Setting("favorite", "red", "收藏网站"),
    new Setting("class", "blue", "收藏文章"),
    new Setting("mark-github", "grey", "github"),
    new Setting("create", "green", "博客地址")
  ];
  static navigationOptions = ({ navigations }: any) => ({
    headerRight: (
      <Icon
        style={{ paddingRight: 16 }}
        name="settings"
        color="white"
        size={24}
      />
    ),
    headerStyle: {
      backgroundColor: Color.primary,
      elevation: 0,
      borderBottomWidth: 0
    }
  });

  constructor(props: any) {
    super(props);
    this.state = {
      loginStatus: false,
      userInfo: new UserInfo()
    };
  }
  render() {
    let { username, email } = this.state.userInfo;
    let setViews = this.settingList.map(
      ({ iconName, iconColor, title, read }) => {
        return (
          <View style={{ flexDirection: "row", padding: 12 }} key={title}>
            {title == "github" ? (
              <Octicons name={iconName} color={iconColor} size={16} />
            ) : (
              <Icon name={iconName} color={iconColor} size={16} />
            )}

            <Heading2
              style={{ marginLeft: 8, flex: 1, fontSize: 14 }}
              key={title}
            >
              {title}
            </Heading2>
            {title === "收藏网站" || title === "收藏文章" ? (
              <Paragraph>{`${read}篇`}</Paragraph>
            ) : (
              <Icon name="chevron-right" size={24} color={Color.gray} />
            )}
          </View>
        );
      }
    );
    return (
      <View style={{ flex: 1, backgroundColor: Color.background }}>
        <View
          style={{
            flexDirection: "row",
            alignContent: "center",
            margin: 16,
            backgroundColor: "white"
          }}
        >
          <Icon name="account-circle" size={48} color={Color.gray} />
          <View style={{ justifyContent: "center", flex: 1, marginLeft: 16 }}>
            <Heading2>
              {this.state.loginStatus ? username : "登陆/注册"}
            </Heading2>
            <Paragraph style={{ marginTop: 8 }}>
              {email == null ? "添加邮箱" : email}
            </Paragraph>
          </View>
          <Icon name="chevron-right" size={24} color={Color.gray} />
        </View>
        <ScrollView style={{ marginTop: 12, marginLeft: 8, marginRight: 16 }}>
          {setViews}
        </ScrollView>
      </View>
    );
  }
}
