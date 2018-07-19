import {
  HTTP_SUCCESS,
  HTTP_FAILURE,
  HTTP_BEFORE
} from "../../../dataFlow/action";
class State {
  refreshState: number = 0;
  projectList: Array<any>;
  constructor(refreshState: number = 0, projectList: Array<any> = []) {
    this.refreshState = refreshState;
    this.projectList = projectList;
  }
}
export default (state: State = new State(), action: any) => {
  switch (action.type) {
    case HTTP_BEFORE:
      return Object.assign({}, state, { refreshState: 1 });
    case HTTP_SUCCESS:
      console.log("action", action);
      const newState = Object.assign({}, state, {
        projectList: action.payload.data.datas,
        refreshState: 0
      });
      return newState;
    case HTTP_FAILURE:
      return { ...state, refreshState: 0 };
    default:
      return state;
  }
};
