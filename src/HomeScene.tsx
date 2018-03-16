import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import * as React from 'react'

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF'
    },
    welcome: {
      fontSize: 30,
      textAlign: 'center',
      margin: 10
    },
  });

export default class HomeScene extends React.Component<any, any> {
    render() {
      return (
        <View style={styles.container}>
          <Text style={styles.welcome}>
            React Native with TypeScript !
          </Text>
        </View>
      );
    }
  }