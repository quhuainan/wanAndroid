import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView
} from "react-native";
import * as React from "react";
import TagView, { TagBean } from "../uiComponent/TagView";
import Color from "../res/Color";
import Api from "./Api";
import { Heading1, Heading2 } from "../uiComponent/Text";
import { TabItemBean } from "./Topic/TopicView";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  tagHeader: {
    backgroundColor: Color.white,
    borderBottomWidth: 1,
    borderBottomColor: Color.gray,
    padding: 8
  }
});
interface State {
  hotTag: TagBean[];
  comNet: TagBean[];
}
export default class HotTagView extends React.Component<any, State> {
  static navigationOptions = ({ navigation }: any) => {
    let { params } = navigation.state;
    return {
      title: "热门标签",
      headerStyle: { backgroundColor: Color.primary }
    };
  };
  constructor(props: any) {
    super(props);
    this.state = {
      hotTag: new Array<TagBean>(),
      comNet: new Array<TagBean>()
    };
  }

  componentDidMount() {
    this.refreshData();
  }

  refreshData = async () => {
    try {
      let commonNetResponse = await fetch(Api.commonNet);
      let hotTagResponse = await fetch(Api.hotTag);
      let commonNetJson = await commonNetResponse.json();
      let hotTagJson = await hotTagResponse.json();
      this.setState({
        hotTag: hotTagJson.data.map((item: any) => {
          return new TagBean(item.id, item.link, item.name);
        }),
        comNet: commonNetJson.data.map((item: any) => {
          return new TagBean(item.id, item.link, item.name);
        })
      });
    } catch (error) {}
  };
  render() {
    return (
      <ScrollView>
        <View>
          <Heading2 style={styles.tagHeader} color={Color.black}>
            大家都在搜
          </Heading2>
          <TagView
            data={this.state.hotTag}
            clickItem={(data: TagBean) => {
              this.props.navigation.navigate("ArticalList", { key: data.name });
            }}
          />
          <Heading2 style={styles.tagHeader}>常用网站</Heading2>
          <TagView
            data={this.state.comNet}
            clickItem={(data: TagBean) => {
              this.props.navigation.navigate("ArticalDetails", {
                link: data.link,
                title: data.name
              });
            }}
          />
        </View>
      </ScrollView>
    );
  }
}
