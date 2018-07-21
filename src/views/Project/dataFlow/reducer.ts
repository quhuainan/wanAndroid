import {
  HTTP_SUCCESS,
  HTTP_FAILURE,
  HTTP_BEFORE
} from "../../../dataFlow/action";
import {
  NetRequestBeforeAT,
  NetRequestFailureAT,
  NetRequestSuccessAT
} from "../../../base";

class State {
  projectListMap: Map<number, ProjectListState>;
  constructor(projectListMap: Map<number, ProjectListState> = new Map()) {
    this.projectListMap = projectListMap;
  }
}

class ProjectListState {
  refreshState: number = 0;
  projectList: Array<any>;
  constructor(refreshState: number = 0, projectList: Array<any> = []) {
    this.refreshState = refreshState;
    this.projectList = projectList;
  }
}
export default (state: State = new State(), action: any) => {
  console.log("reducer-action", action);
  console.log("reducer-state", state);

  switch (action.type) {
    case NetRequestBeforeAT:
      state.projectListMap.set(
        action.payload.params.cid,
        Object.assign({}, state.projectListMap.get(action.payload.params.cid), {
          refreshState: action.payload.params.pageNum == 1 ? 1 : 0
        })
      );
      console.log("请求之前", state.projectListMap);
      return new State(state.projectListMap);
    case NetRequestSuccessAT:
      let oldState = state.projectListMap.get(action.meta.params.cid)|| new ProjectListState()
      let newList =  action.meta.params.pageNum==1?action.payload.data.datas:(oldState.projectList||[]).concat(action.payload.data.datas)
      console.log("oldState",oldState)
      state.projectListMap.set(
        action.meta.params.cid,
        new ProjectListState(0,newList )
      );
      console.log("map", state.projectListMap);
      return new State(state.projectListMap);

    default:
      return state;
  }
};

export { State, ProjectListState };
