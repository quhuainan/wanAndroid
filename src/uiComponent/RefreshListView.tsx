
import * as React from 'react'
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, ViewPropTypes, FlatListProperties } from 'react-native'

export const RefreshState = {
    Idle: 0,
    HeaderRefreshing: 1,
    FooterRefreshing: 2,
    NoMoreData: 3,
    Failure: 4,
}

const DEBUG = false
const log = (text: string) => { DEBUG && console.log(text) }

interface Props extends FlatListProperties<any> {
    refreshState: number,
    onHeaderRefresh?: Function,
    onFooterRefresh?: Function,
    data: Array<any>,
    footerContainerStyle?: any,
    footerTextStyle?: any,
    listRef?: any,
    footerRefreshingText?: string,
    footerFailureText?: string,
    footerNoMoreDataText?: string,
}



class RefreshListView extends React.Component<Props> {

    static defaultProps = {
        footerRefreshingText: '数据加载中…',
        footerFailureText: '点击重新加载',
        footerNoMoreDataText: '已加载全部数据',
    }

    onHeaderRefresh = () => {
        if (this.shouldStartHeaderRefreshing()&&this.props.onHeaderRefresh) {
            this.props.onHeaderRefresh(RefreshState.HeaderRefreshing)
        }
    }

    onEndReached = (info: { distanceFromEnd: number }) => {
        if (this.shouldStartFooterRefreshing()) {
            this.props.onFooterRefresh && this.props.onFooterRefresh(RefreshState.FooterRefreshing)
        }
    }

    shouldStartHeaderRefreshing = () => {
        if (this.props.refreshState == RefreshState.HeaderRefreshing ||
            this.props.refreshState == RefreshState.FooterRefreshing) {
            return false
        }
        return true
    }

    shouldStartFooterRefreshing = () => {
        let { refreshState, data } = this.props
        if (data.length == 0) {
            return false
        }
        return (refreshState == RefreshState.Idle)
    }

    render() {
        let { renderItem, ...rest } = this.props

        return (
            <FlatList
                ref={this.props.listRef}
                onEndReached={this.onEndReached}
                onRefresh={this.onHeaderRefresh}
                refreshing={this.props.refreshState == RefreshState.HeaderRefreshing}
                onEndReachedThreshold={0.1}
                renderItem={this.props.renderItem}
                keyExtractor={this.props.keyExtractor}
                ListHeaderComponent={this.props.ListHeaderComponent}
                {...rest}
            />
        )
    }

    renderFooter = () => {
        let footer = null

        let footerContainerStyle = [styles.footerContainer, this.props.footerContainerStyle]
        let footerTextStyle = [styles.footerText, this.props.footerTextStyle]
        let { footerRefreshingText, footerFailureText, footerNoMoreDataText } = this.props

        switch (this.props.refreshState) {
            case RefreshState.Idle:
                footer = (<View style={footerContainerStyle} />)
                break
            case RefreshState.Failure: {
                footer = (
                    <TouchableOpacity
                        style={footerContainerStyle}
                        onPress={() => {
                            this.props.onFooterRefresh && this.props.onFooterRefresh(RefreshState.FooterRefreshing)
                        }}
                    >
                        <Text style={footerTextStyle}>{footerFailureText}</Text>
                    </TouchableOpacity>
                )
                break
            }
            case RefreshState.FooterRefreshing: {
                footer = (
                    <View style={footerContainerStyle} >
                        <ActivityIndicator size="small" color="#888888" />
                        <Text style={[footerTextStyle, { marginLeft: 7 }]}>{footerRefreshingText}</Text>
                    </View>
                )
                break
            }
            case RefreshState.NoMoreData: {
                footer = (
                    <View style={footerContainerStyle} >
                        <Text style={footerTextStyle}>{footerNoMoreDataText}</Text>
                    </View>
                )
                break
            }
        }

        return footer
    }
}

const styles = StyleSheet.create({
    footerContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        height: 44,
    },
    footerText: {
        fontSize: 14,
        color: '#555555'
    }
})

export default RefreshListView