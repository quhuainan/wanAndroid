import React from "react";
import { View, Image, Text } from "react-native";

export default class SplashView extends React.Component<any> {
  static navigationOptions = ({ navigations }: any) => ({
    header: () => {
      visible: false;
    }
  });
  
  componentDidMount() {
     setTimeout(()=>{
         //this.props.navigation.navigate("Tab")
         this.props.navigation.navigate("ArticalDetails",{title:'娱乐城',link:"https://www.qushanzu.com/"})
     },5*1000) 
  }
  render() {
    return (
      <View
        style={{
          backgroundColor: "white",
          flex: 1,
          alignItems: "center",
          paddingBottom: 34
        }}
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignContent: "center" }}
        >
          <Image
            style={{ height: 80, width: 80 }}
            source={require("./res/logo.png")}
          />
        </View>

        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Image
            style={{ height: 24, width: 24 }}
            source={require("./res/bottom_icon.png")}
          />
          <Text
            style={{
              fontSize: 10,
              lineHeight: 12,
              marginTop: 16,
              letterSpacing: 3,
              color: "#A6B0BD"
            }}
          >
            LOADING
          </Text>
        </View>
      </View>
    );
  }
  
}
