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
import {
  Heading1,
  Heading3,
  Heading2,
  Paragraph
} from "../../uiComponent/Text";
import Color from "../../res/Color";
import Icon from "react-native-vector-icons/MaterialIcons";
import DimenUtlis from "../../utlis/DimenUtlis";

interface Props {
  projectData: ProjectDetails;
}

// 项目详情
export interface ProjectDetails {
  apkLink: string;
  author: string; //作者
  chapterId: number;
  chapterName: string; // 项目归属类型
  collect: boolean; // 是否收藏
  courseId: number;
  desc: string; //详情描述
  envelopePic: string; //图片示例
  fresh: boolean;
  id: number;
  link: string; //wanAndroid 跳转链接
  niceDate: string;
  origin: string;
  projectLink: string; // 项目地址
  publishTime: number; // 发布日期
  superChapterId: number;
  superChapterName: string;
  tags: any[];
  title: string; //标题
  type: number;
  visible: number;
  zan: number;
}
export class ProjectItem extends React.Component<Props> {
  render() {
    let {
      title,
      desc,
      publishTime,
      author,
      collect,
      envelopePic,
      link
    } = this.props.projectData;
    return (
      <View
        style={{
          flexDirection: "row",
          margin: 16,
          height: 130,
        }}
      >
        <Image
          source={{
            uri:
              "http://www.wanandroid.com/blogimgs/1c09f839-bf49-4a4f-a6e6-1c27fe41160a.png"
          }}
          style={{ width: 80, height: 130 }}
        />
        <View
          style={{
            flexDirection: "column",
            flex: 1,
            justifyContent: "space-between",
            marginLeft: 16
          }}
        >
          <Heading2>{title}</Heading2>
          <Heading3 style={{ marginTop: 8 }} numberOfLines={3}>
            {desc}
          </Heading3>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <Paragraph >
              {DimenUtlis.getRelativeTime(publishTime)}
              <Paragraph>{`    ${author}`}</Paragraph>
            </Paragraph>

            <Icon
              name={collect ? "favorite" : "favorite-border"}
              size={24} //图片大小
              color={collect ? Color.primary : Color.gray}
            />
          </View>
        </View>
      </View>
    );
  }
}
