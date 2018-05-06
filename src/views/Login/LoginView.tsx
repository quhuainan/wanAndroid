import {Text, View, TouchableOpacity, Image, TextInput, Button, Alert } from "react-native";
import * as React from "react";
//import { Icon } from "react-native-vector-icons/Icon";
import Icon from "react-native-vector-icons/MaterialIcons";
import Color from "../../res/Color";
import DimenUtlis from "../../utlis/DimenUtlis";
import { Paragraph } from "../../uiComponent/Text";
import Octicons from "react-native-vector-icons/Octicons";


export default class LoginView extends React.Component<any, any> {
  render() {
    return (
      <View style={{backgroundColor:Color.background,flex:1,alignItems:"center"}}>
        <Icon style={{marginTop:64}}name="ac-unit" color={Color.primary} size={48} />
        <View style={{flex:1,width:DimenUtlis.width,padding:24}}>
        <TextInput style={{borderRadius:2 ,padding:16,backgroundColor:"white"}} placeholder="请输入账号"/>
        <View style={{backgroundColor:"gray",height:DimenUtlis.onePixel}}/>
        <TextInput style={{borderRadius:2 ,padding:16,backgroundColor:"white"}} placeholder="密码"/>
        <View style={{marginTop:16,backgroundColor:Color.primary,padding:4,borderRadius:4}}>
        <Button  title="登录" onPress={()=>{Alert.alert("登录")}} color="white"/>
        </View>
        <View style={{flexDirection:"row",justifyContent:"space-between",marginTop:16}}>
        <Paragraph onPress={()=>{Alert.alert("忘记密码")}}>忘记密码?</Paragraph>
        <Paragraph style={{color:Color.primary}} onPress={()=>{this.props.navigation.navigate("Register")}}>注册帐号</Paragraph>
        </View>
        </View>
        <Text style={{marginBottom:24,color:Color.primary,fontSize:12}}>
        <Octicons name="mark-github" color="gray" size={16} />
        {`  玩Android`}</Text>
      </View>
    );
  }
}
