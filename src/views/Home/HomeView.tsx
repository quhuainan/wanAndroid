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
import HttpUtlis from "../../utlis/Http";
interface State {
  bannerData: BannerBean[];
  listData: ArticalListBean[];
  resfreshState: number;
}

export default class HomeView extends React.Component<any, State> {
  pageNum: number = 0;
  static navigationOptions = ({ navigation }: any) => ({
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
    headerTitle: (
      <Text style={{ color: "white", fontSize: 16 }}>玩android</Text>
    ),

    headerStyle: { backgroundColor: Color.primary }
  });

  constructor(props: any) {
    super(props);
    this.state = {
      bannerData: [],
      listData:new Array<ArticalListBean>(),
      resfreshState: RefreshState.Idle
    };
  }

  componentDidMount() {
     this.initdata();
  }

  initdata = () => {
     this.getBannerData();
     this.getArticalList();
     console.log("aaaa","刷新列表1")

  };
  getBannerData = () => {
    HttpUtlis.getRequest(Api.banner, (response: any) => {
      this.setState({ bannerData: response });
    });
  };

  getArticalList = () => {
    console.log("aaaa","刷新列表2")
    this.setState({
      resfreshState:
        this.pageNum == 0
          ? RefreshState.HeaderRefreshing
          : RefreshState.FooterRefreshing
    });
    HttpUtlis.getRequest(getHomeArticalList(this.pageNum), (response: any) => {
      this.setState({
        listData:this.pageNum == 0
        ?response.datas:[...this.state.listData,response.datas] ,
        resfreshState:
          response.datas.length < 20
            ? RefreshState.NoMoreData
            : RefreshState.Idle
      });
    });
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
            this.pageNum = 0;
            console.log("aaaaa","刷新头")
            this.initdata();
          }}
          onFooterRefresh={() => {
            ++this.pageNum + 1;
           //  this.getArticalList();
            console.log("aaaa","刷新列表3")

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
