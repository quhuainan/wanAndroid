import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  WebView,
  Alert
} from "react-native";
import * as React from "react";
import DimenUtlis from "../utlis/DimenUtlis";
import Icon from "react-native-vector-icons/MaterialIcons";
import Color from "../res/Color";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  welcome: {
    height: DimenUtlis.height,
    width: DimenUtlis.width
  }
});

export default class ArticalDetailsView extends React.Component<any, any> {
  static navigationOptions = ({ navigations }: any) => ({
    header: () => {
      visible: false;
    }
  });
  // static navigationOptions = ({ navigation }: any) => {
  //   let { params } = navigation.state;
  //   return {
  //     title: params.title,
  //     headerRight: (
  //       <View style={{ flexDirection: "row", marginRight: 8 }}>
  //         <TouchableOpacity
  //           style={{ marginRight: 8 }}
  //           onPress={() => {
  //             Alert.alert("点击更多菜单");
  //           }}
  //         >
  //           <Icon name="more-vert" size={24} color="white" />
  //         </TouchableOpacity>
  //       </View>
  //     ),
  //     headerStyle: { backgroundColor: Color.primary }
  //   };
  // };
  render() {
    let { link, title } = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <WebView
          style={styles.welcome}
          startInLoadingState={true}
          source={{ uri: link, method: "GET" }}
        />
      </View>
    );
  }
}
