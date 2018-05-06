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
import Swiper from "react-native-swiper";
import DimenUtlis from "../../utlis/DimenUtlis";
import Api, { getHomeArticalList } from "../Api";
import ArticalListItem, {
  ArticalListBean
} from "../../uiComponent/ArticalListItem";
import { BannerBean } from "../../bean";
import Color from "../../res/Color";
import Icon from "react-native-vector-icons/MaterialIcons";
import OcticonsIcon from "react-native-vector-icons/Octicons";

import RefreshListView, {
  RefreshState
} from "../../uiComponent/RefreshListView";
interface State {
  bannerData: BannerBean[];
  listData: ArticalListBean[];
  pageNum: number;
  resfreshState: number;
}

export default class HomeView extends React.Component<any, State> {
  static navigationOptions = ({ navigation }: any) => ({
    title: "玩android",
    headerLeft: (
      <TouchableOpacity
        style={styles.toolbarStyle}
        onPress={() => {
          Alert.alert("展开侧边栏");
        }}
      >
        <Icon color={Color.white} name="menu" size={24} />
      </TouchableOpacity>
    ),
    headerRight: (
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={styles.toolbarStyle}
          onPress={() => {
            navigation.navigate("HotTag");
          }}
        >
          <OcticonsIcon color={Color.white} name="flame" size={24} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.toolbarStyle}
          onPress={() => {
            navigation.navigate("SearchList");
          }}
        >
          <Icon color={Color.white} name="search" size={24} />
        </TouchableOpacity>
      </View>
    ),
    headerStyle: { backgroundColor: Color.primary }
  });

  constructor(props: any) {
    super(props);
    console.log("props Home", props);
    this.state = {
      bannerData: [],
      listData: [],
      pageNum: 0,
      resfreshState: RefreshState.Idle
    };
  }

  componentDidMount() {
    this.initdata();
  }

  initdata = () => {
    this.getBannerData();
    this.getArticalList();
  };
  getBannerData = async () => {
    try {
      let response = await fetch(Api.banner);
      let json: any = await response.json();
      this.setState({ bannerData: json.data });
    } catch (error) {
      console.log(error);
    }
  };

  getArticalList = async () => {
    this.setState({
      resfreshState:
        this.state.pageNum == 0
          ? RefreshState.HeaderRefreshing
          : RefreshState.FooterRefreshing
    });

    try {
      this.setState({
        resfreshState:
          this.state.pageNum == 0
            ? RefreshState.HeaderRefreshing
            : RefreshState.FooterRefreshing
      });
      let response = await fetch(getHomeArticalList(this.state.pageNum));
      let json: any = await response.json();
      this.setState({
        listData: json.data.datas,
        resfreshState:
          json.data.datas.length < 20
            ? RefreshState.NoMoreData
            : RefreshState.Idle
      });
    } catch (error) {
      this.setState({ listData: [], resfreshState: RefreshState.Failure });
    }
  };

  startDetailsView = (data: ArticalListBean) => {
    this.props.navigation.navigate("ArticalDetails", {
      link: data.link,
      title: data.title
    });
  };
  renderItem({ item }: any): any {
    return (
      <ArticalListItem
        data={item}
        clickItem={(data: ArticalListBean) => {
          this.startDetailsView(data);
        }}
      />
    );
  }
  renderHeader = () => {
    return (
      <Swiper height={DimenUtlis.width * 5 / 9}>
        {this.state.bannerData.map(item => {
          return (
            <Image
              style={{
                height: DimenUtlis.width * 5 / 9,
                width: DimenUtlis.width
              }}
              source={{
                uri: item.imagePath
              }}
              key={item.id}
            />
          );
        })}
      </Swiper>
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <RefreshListView
          ListHeaderComponent={this.renderHeader}
          refreshState={this.state.resfreshState}
          onHeaderRefresh={() => {
            this.setState({ pageNum: 0 });
            this.initdata();
          }}
          onFooterRefresh={() => {
            this.setState({ pageNum: this.state.pageNum + 1 });
            this.getArticalList();
          }}
          data={this.state.listData}
          keyExtractor={item => {
            return item.id.toString();
          }}
          renderItem={this.renderItem.bind(this)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Color.background
  },
  toolbarStyle: {
    padding: 8
  }
});
