import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Button,
  Alert
} from "react-native";
import * as React from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import Color from "../../res/Color";
import DimenUtlis from "../../utlis/DimenUtlis";

export default class RegisterView extends React.Component {
  render() {
    return (
      <View
        style={{
          backgroundColor: Color.background,
          flex: 1,
          alignItems: "center"
        }}
      >
        <View style={{ flex: 1, width: DimenUtlis.width, padding: 24 }}>
          <TextInput
            style={{ borderRadius: 2, padding: 16, backgroundColor: "white" }}
            placeholder="请输入账号"
          />
          <View
            style={{ backgroundColor: "gray", height: DimenUtlis.onePixel }}
          />
          <TextInput
            style={{ borderRadius: 2, padding: 16, backgroundColor: "white" }}
            placeholder="密码"
          />
          <View
            style={{ backgroundColor: "gray", height: DimenUtlis.onePixel }}
          />
          <TextInput
            style={{ borderRadius: 2, padding: 16, backgroundColor: "white" }}
            placeholder="请再次输入密码"
          />
          <View
            style={{
              marginTop: 16,
              backgroundColor: Color.primary,
              padding: 4,
              borderRadius: 4
            }}
          >
            <Button
              title="注册"
              onPress={() => {
                Alert.alert("登录");
              }}
              color="white"
            />
          </View>
        </View>
      </View>
    );
  }
}
