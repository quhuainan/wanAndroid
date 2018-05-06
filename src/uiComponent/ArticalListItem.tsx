import * as React from "react";
import { View, Image, Text, TouchableOpacity, Alert } from "react-native";
import Color from "../res/Color";
import { Heading3, Paragraph, Heading2, Heading1 } from "./Text";
import DimenUtlis from "../utlis/DimenUtlis";
import Icon from "react-native-vector-icons/MaterialIcons";
interface Props {
  data: ArticalListBean;
  clickItem: Function;
}

export class ArticalListBean {
  apkLink: string | null = null;
  author: string | null = null;
  chapterId: number | null = null;
  chapterName: string | null = null;
  collect: boolean | null = null;
  courseId: number | null = null;
  desc: string | null = null;
  envelopePic: string | null = null;
  fresh: boolean | null = null;
  id: number  = -1;
  link: string = "";
  niceDate: string | null = null;
  origin: string | null = null;
  projectLink: string | null = null;
  publishTime: number = 0;
  superChapterId: number | null = null;
  superChapterName: string | null = null;
  tags: any[] | null = null;
  title: string = "";
  type: number | null = null;
  visible: number | null = null;
  zan: number | null = null;
}
export default class ArticalListItem extends React.Component<Props, any> {
 
  render() {
    let data = this.props.data;
    if (data === undefined) {
      data = new ArticalListBean();
    }
    return (
      <TouchableOpacity onPress={() => {this.props.clickItem(data)}}>
        <View
          style={{
            margin: 8,
            backgroundColor: Color.white
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              padding: 8
            }}
          >
            <Image
              style={{ height: 24, width: 24, borderRadius: 12 }}
              source={{
                uri: "http://www.qqju.com/pic/tx/tx23282_2.jpg"
              }}
            />
            <Heading3 style={{ marginLeft: 8, flex: 1, textAlign: "justify" }}>
              {data.author}
            </Heading3>
            <Heading3>{DimenUtlis.getRelativeTime(data.publishTime)}</Heading3>
          </View>
          <Heading2 style={{ color: "#000", padding: 8 }}>
            {data.title}
          </Heading2>
          <View
            style={{
              flexDirection: "row",
              padding: 8,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Heading2 style={{ color: Color.primary, flex: 1 }}>
              {data.superChapterName}
            </Heading2>
            <TouchableOpacity
              onPress={() => {
                Alert.alert("点击收藏");
              }}
            >
              <Icon
                name={data.collect ? "favorite" : "favorite-border"}
                size={24} //图片大小
                color={data.collect ? Color.primary : Color.gray}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
