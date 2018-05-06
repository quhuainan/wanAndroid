export default {
  serverDomain: "http://www.wanandroid.com/",
  banner: "banner/json",
  knowSystem: "http://www.wanandroid.com/tree/json",
  commonNet: "http://www.wanandroid.com/friend/json", //常用网站
  hotTag: "http://www.wanandroid.com/hotkey/json", // 热门标签
  projectType: "project/tree/json",
  login: "user/login" //登录
};
export function getHomeArticalList(id: number): string {
  return `article/list/${id}/json`;
}
export function getKnowSystemArticalList(id: number): string {
  return `http://www.wanandroid.com/article/list/0/json?cid=${id}`;
}

//根据文章标题查询文章
export function quertArtlicalList(pageNum: number): string {
  return `article/query/${pageNum}/json`;
}

//获取项目详情
export function queryProjectDetails(pageNum: number, cid: number) {
  return `project/list/${pageNum}/json?cid=${cid}`;
}
