import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import {
  AppStatus,
  AppStatusType,
  NetRequestBeforeAT,
  NetRequestFailureAT,
  NetRequestSuccessAT
} from "..";
import DimenUtlis from "../../utlis/DimenUtlis";
import Color from "../../res/Color";

class Props {
  appStatus: AppStatus = new AppStatus();
  isLoading: boolean = false;
}
class AppDefendView extends React.Component<Props> {
  render() {
    console.log("children", this.props);

    // this.props.children
    return this.props.appStatus.name == AppStatusType.Success ? (
      <View style={{ flex: 1, justifyContent: "center" }}>
        {this.props.children}

        <ActivityIndicator
          animating={this.props.isLoading}
          style={{
            width: 80,
            height: 80,
            top: (DimenUtlis.height - 80) / 2,
            left: (DimenUtlis.width - 80) / 2,
            position: "absolute",
            display: this.props.isLoading ? "flex" : "none"
          }}
          size="large"
          color={Color.primary}
        />
      </View>
    ) : (
      <View>
        <Text>{this.props.appStatus.message}</Text>
      </View>
    );
  }
}

export const reducer = (state = new Props(), action: any) => {
  console.log("全局处理reducer", action);
  switch (action.type) {
    case NetRequestBeforeAT:
      return { ...state, isLoading: action.meta };
    case NetRequestSuccessAT:
      return { ...new Props() };
    case NetRequestFailureAT:
      return { ...state, appStatus: action.payload,isLoading:false };
    default:
      return state;
  }
};

const mapStateToProps = (state: any, ownProps: AppStatus) => {
  return { ...state.app };
};

const mapDispatchToProps = (dispatch: any, ownProps: AppStatus) => {
  return {
    refreshData: (pageNum: number) => {}
  };
};

export default connect(
  mapStateToProps,
  {}
)(AppDefendView);
