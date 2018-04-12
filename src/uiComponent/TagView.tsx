import * as React from "react";
import { View, Text, ViewStyle, TouchableOpacity } from "react-native";
import DimenUtlis from "../utlis/DimenUtlis";

interface Props {
  data: TagBean[];
  style?: ViewStyle;
  clickItem?: Function;
}

export class TagBean {
  id: number;
  link: string | null;
  name: string;

  constructor(id: number, link: string, name: string = "") {
    this.id = id;
    this.link = link;
    this.name = name;
  }
}

export default class TagView extends React.Component<Props> {
  render() {
    return (
      <View
        style={[{ flexDirection: "row", flexWrap: "wrap" }, this.props.style]}
      >
        {this.props.data.map(item => {
          let red = Math.floor(Math.random() * 100);
          let yellow = Math.floor(Math.random() * 100);
          let blue = Math.floor(Math.random() * 100);
          let color = `#${red<10?10:red}${yellow<10?11:yellow}${blue<10?12:blue}`;
          console.log("颜色", color);
          return (
            <TouchableOpacity
              onPress={() => {
                if (this.props.clickItem !== undefined) {
                  this.props.clickItem(item);
                }
              }}
              key={item.id}
            >
              <Text
                style={{
                  borderRadius: 16,
                  borderWidth: DimenUtlis.onePixel,
                  backgroundColor: "white",
                  padding: 8,
                  margin: 8,
                  color: color
                }}
                
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
}
