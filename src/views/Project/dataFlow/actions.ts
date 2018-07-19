import { REFRESH_DATA_PROJECT, CLICK_ITEM_PROJECT,ASYNC_BEFORE} from "./actionTypes";


export const refreshData = (page:number,cid:number,type?:string) => {
  return {type:REFRESH_DATA_PROJECT,playload:{id:page,cid:cid}};
};

