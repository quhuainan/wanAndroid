import { StyleSheet, View, TouchableOpacity } from "react-native";
import * as React from "react";

import Color from "../../res/Color";
import Icon from "react-native-vector-icons/MaterialIcons";
import OcticonsIcon from "react-native-vector-icons/Octicons";
import ArticalList from "../../businessComponet/articalList/ArticalList";
import { HomeBanner } from "../../businessComponet/banner";

export default class HomeView extends React.Component {
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
    headerTitle: "玩android"
  });

  render() {
    return (
      <View style={styles.container}>
        <ArticalList ListHeaderComponent={<HomeBanner />} />
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
