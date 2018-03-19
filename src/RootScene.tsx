import { View } from 'react-native'
import * as React from 'react'
import { StackNavigator, TabNavigator, TabBarBottom, NavigationScreenConfig } from 'react-navigation'
import HomeView from './views/HomeView';
import KonwSystemView from './views/KonwSystemView';


export default class RootView extends React.Component {
    render() {
        return <Navigator />
    }
}


const Tab = TabNavigator({
    HomeView: {
        screen: HomeView,
    },
    KonwSystem: {
        screen: KonwSystemView,
    },
})
const Navigator = StackNavigator({
    Tab: { screen: Tab }
})