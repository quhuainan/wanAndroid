import { Dimensions, Platform, PixelRatio } from "react-native";
import moment from "moment";

export default {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height,
  onePixel: 1 / PixelRatio.get(),
  statusBarHeight: Platform.OS === "ios" ? 20 : 0,
  getRelativeTime : (time: number): string => {
    let normalTime = moment(time).format("YYYY-MM-DD");
    let relativeTime = moment(normalTime, "YYYY-MM-DD").fromNow();
    let diff = moment().diff(moment(time).format("YYYY-MM-DD"), "days");
    return diff > 2 ? normalTime : relativeTime;
  }
};

