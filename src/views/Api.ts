export default {
  banner: "http://www.wanandroid.com/banner/json",
  knowSystem: "http://www.wanandroid.com/tree/json"
};
export function getHomeArticalList(id: number): string {
  return `http://www.wanandroid.com/article/list/${id}/json`;
}
export function getKnowSystemArticalList(id: number): string {
  return `http://www.wanandroid.com/article/list/0/json?cid=${id}`;
}
