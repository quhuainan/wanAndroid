export default {
  banner: "http://www.wanandroid.com/banner/json",
  knowSystem: "http://www.wanandroid.com/tree/json",
  commonNet: "http://www.wanandroid.com/friend/json", //常用网站
  hotTag: "http://www.wanandroid.com/hotkey/json" // 热门标签
};
export function getHomeArticalList(id: number): string {
  return `http://www.wanandroid.com/article/list/${id}/json`;
}
export function getKnowSystemArticalList(id: number): string {
  return `http://www.wanandroid.com/article/list/0/json?cid=${id}`;
}

//根据文章标题查询文章
export function quertArtlicalList(key: string, pageNum: number = 0): string {
  return `http://wanandroid.com/article/query/${pageNum}/json?k=${key}`;
}
