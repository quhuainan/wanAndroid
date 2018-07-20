import React from "react";
import { connect } from "react-redux";
import { View, Text } from "react-native";
import { ErrorBean } from "../../dataFlow/data";
import { HTTP_FAILURE } from "../../dataFlow/action";

class ExceptionHandlerView extends React.Component<ErrorBean> {
  render() {
    console.log("children", this.props);

    return this.props.code == "1" ? (
      this.props.children
    ) : (
      <View>
        <Text>{this.props.errorMsg}</Text>
      </View>
    );
  }
}

export const reducer = (state = new ErrorBean(), action: any) => {
  console.log("全局处理reducer", action);
  switch (action.type) {
    case HTTP_FAILURE:
      return new ErrorBean(action.payload.name,action.payload.message);
    default:
      return state;
  }
};

const mapStateToProps = (state: any, ownProps: ErrorBean) => {
  return { ...state.error };
};

const mapDispatchToProps = (dispatch: any, ownProps: ErrorBean) => {
  return {
    refreshData: (pageNum: number) => {}
  };
};

export default connect(
  mapStateToProps,
  {}
)(ExceptionHandlerView);
