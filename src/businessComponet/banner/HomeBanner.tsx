import { Image } from "react-native";
import React from "react";
import { connect } from "react-redux";
import { AppAction, NetRequestAction, NetRequestBean } from "../../base";
import { Dispatch } from "../../../node_modules/redux";
import Swiper from "react-native-swiper";
import DimenUtlis from "../../utlis/DimenUtlis";
import Api from "../../views/Api";

const TAG = "HomeBanner";
class BannerBean {
  desc: string | null = null;
  id: number = 0;
  imagePath: string =
    "http://www.wanandroid.com/blogimgs/50c115c2-cf6c-4802-aa7b-a4334de444cd.png";
  isVisible: number | null = null;
  order: number | null = null;
  title: string | null = null;
  type: string | null = null;
  url: string | null = null;
}

class State {
  bannerData?: BannerBean[];
  constructor(bannerData: BannerBean[]) {
    this.bannerData = bannerData;
  }
}

class HomeBanner extends React.Component<
  State & { onLoadBanner: () => void } & any
> {
  componentDidMount() {
    this.props.onLoadBanner();
  }
  render() {
    return (
      <Swiper height={(DimenUtlis.width * 5) / 9}>
        {this.props.bannerData.map((item: BannerBean) => {
          return (
            <Image
              style={{
                height: (DimenUtlis.width * 5) / 9,
                width: DimenUtlis.width
              }}
              source={{
                uri: item.imagePath
              }}
              key={item.id}
            />
          );
        })}
      </Swiper>
    );
  }
}

const mapStateToProps = (state: any, ownProps: State) => {
  console.log(TAG + "--state", state);
  return { bannerData: state.homeBanner.bannerData || [] };
};
const mapDispatchToProps = (dispatch: Dispatch, ownProps: State) => {
  return {
    onLoadBanner: () => {
      const action = new NetRequestAction(
        new AppAction("HomeBanner/OnLoadBanner"),
        new NetRequestBean("GET", Api.banner)
      );
      action.meta = false;
      dispatch({ ...action });
    }
  };
};
export const reducer = (state: State = new State([]), action: any) => {
  console.log(TAG + "--action", action);
  switch (action.type) {
    case "HomeBanner/OnLoadBanner":
      return Object.assign({}, state, { bannerData: action.payload });
    default:
      return state;
  }
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeBanner);
