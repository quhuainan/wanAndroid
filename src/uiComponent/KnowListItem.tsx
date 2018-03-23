import * as React from "react";
import { View, Text } from "react-native";
import { Heading1 } from "./Text";

export class KnowItemBean {
  children: KnowItemBean[] = [];
  courseId: number | null = null;
  id: number | null = null;
  name: string | null = null;
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
      <Text> {item.name}</Text>;
    });
    return (
      <View>
        <Heading1>{data.name}</Heading1>
        <View>{views}</View>
      </View>
    );
  }
}
