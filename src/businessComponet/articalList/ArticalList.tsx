import { Image } from "react-native";
import React from "react";
import { connect } from "react-redux";
import { AppAction, NetRequestAction, NetRequestBean } from "../../base";
import { Dispatch } from "../../../node_modules/redux";
import Swiper from "react-native-swiper";
import DimenUtlis from "../../utlis/DimenUtlis";
import Api, { getHomeArticalList } from "../../views/Api";
import RefreshListView, {
  RefreshState
} from "../../uiComponent/RefreshListView";
import { HomeBanner } from "../banner";
import { refreshData } from "../../views/Project/dataFlow/actions";
import ArticalListItem from "../../uiComponent/ArticalListItem";

const TAG = "ArticalList";
export class ArticalListBean {
  apkLink: string | null = null;
  author: string | null = null;
  chapterId: number | null = null;
  chapterName: string | null = null;
  collect: boolean | null = null;
  courseId: number | null = null;
  desc: string | null = null;
  envelopePic: string | null = null;
  fresh: boolean | null = null;
  id: number = -1;
  link: string = "";
  niceDate: string | null = null;
  origin: string | null = null;
  projectLink: string | null = null;
  publishTime: number = 0;
  superChapterId: number | null = null;
  superChapterName: string | null = null;
  tags: any[] | null = null;
  title: string = "";
  type: number | null = null;
  visible: number | null = null;
  zan: number | null = null;
}

class State {
  articalList?: ArticalListBean[];
  resfreshState?: number = RefreshState.Idle;
  constructor(articalList: ArticalListBean[], resfreshState: number) {
    this.articalList = articalList;
    this.resfreshState = resfreshState;
  }
}

class ArticalList extends React.Component<
  State & { onLoadArticalList: () => void } & any & {
      ListHeaderComponent?:
        | React.ComponentClass<any>
        | React.ReactElement<any>
        | (() => React.ReactElement<any>)
        | null;
    }
> {
  pageNum = 0;
  componentDidMount() {
    this.props.onLoadArticalList(1);
  }

  startDetailsView = (data: ArticalListBean) => {
    this.props.navigation.navigate("ArticalDetails", {
      link: data.link,
      title: data.title
    });
  };

  renderItem({ item }: any): any {
    return (
      <ArticalListItem
        data={item}
        clickItem={(data: ArticalListBean) => {
          this.startDetailsView(data);
        }}
      />
    );
  }
  render() {
    return (
      <RefreshListView
        ListHeaderComponent={this.props.ListHeaderComponent}
        refreshState={this.props.resfreshState}
        onHeaderRefresh={() => {
          this.pageNum = 0;
          this.props.onLoadArticalList(1);
        }}
        onFooterRefresh={() => {
          this.props.onLoadArticalList(++this.pageNum);
        }}
        data={this.props.articalList}
        keyExtractor={item => {
          return item.id.toString();
        }}
        renderItem={this.renderItem.bind(this)}
      />
    );
  }
}

const mapStateToProps = (state: any, ownProps: State) => {
  console.log(TAG + "--state", state);
  return {...new State(state.articalList.articalList.datas||[],state.articalList.refreshState)};
};
const mapDispatchToProps = (dispatch: Dispatch, ownProps: State) => {
  return {
    onLoadArticalList: (pageNum:number) => {
      const action = new NetRequestAction(
        new AppAction("ArticalList/OnLoadArticalList"),
        new NetRequestBean("GET", getHomeArticalList(pageNum))
      );
      action.meta = false;
      dispatch({ ...action });
    }
  };
};
export const reducer = (
  state: State = new State([], RefreshState.Idle),
  action: any
) => {
  console.log(TAG + "--action", action);
  switch (action.type) {
    case "ArticalList/OnLoadArticalList":
      return Object.assign({}, state, { articalList: action.payload });
    default:
      return state;
  }
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticalList);
