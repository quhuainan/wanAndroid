import * as React from "react";
import { View, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Color from "../res/Color";

interface Props {
  focused: boolean;
  icon: string;
}

export default class TabItem extends React.Component<Props> {
  render() {
    return (
      <Icon
        name={this.props.icon}
        size={24} //图片大小
        color={this.props.focused ? Color.primary : Color.gray}
      />
    );
  }
}
