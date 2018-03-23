export default {
  banner: "http://www.wanandroid.com/banner/json"
};
export function getHomeArticalList(id: number): string {
  return `http://www.wanandroid.com/article/list/${id}/json`;
}
