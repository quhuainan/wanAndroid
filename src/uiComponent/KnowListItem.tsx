import * as React from "react";
import { View, Text, Image } from "react-native";
import { Heading1, Heading2 } from "./Text";
import Color from "../res/Color";
import Icon from "react-native-vector-icons/MaterialIcons";

export class KnowItemBean {
  children: KnowItemBean[] = [];
  courseId: number | null = null;
  id: number | null = null;
  name: string | null = "屈淮南";
  order: number | null = null;
  parentChapterId: number | null = null;
  visible: number | null = null;
}
interface Props {
  data: KnowItemBean;
}
export default class KnowListItem extends React.Component<Props> {
  render() {
    let data: KnowItemBean = this.props.data;
    let views = data.children.map((item: KnowItemBean) => {
      return <Text style={{ padding: 8 }}> {item.name}</Text>;
    });
    return (
      <View>
        <View style={{ height: 8 }} />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            padding: 8
          }}
        >
          <View style={{ flex: 1 }}>
            <Heading2 style={{ color: Color.black }}>{data.name}</Heading2>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {views}
            </View>
          </View>
          <Icon name="chevron-right" size={24} />
        </View>
      </View>
    );
  }
}
