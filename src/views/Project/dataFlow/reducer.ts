import {
  HTTP_SUCCESS,
  HTTP_FAILURE,
  HTTP_BEFORE
} from "../../../dataFlow/action";

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
  console.log('reducer-action',action)
  console.log('reducer-state',state)

  switch (action.type) {
    case HTTP_BEFORE:
      state.projectListMap.set(
        action.params,
        Object.assign({}, state.projectListMap.get(action.params), {
          refreshState: 1
        })
      );
      console.log('请求之前',state.projectListMap)
      return new State(state.projectListMap);
    case HTTP_SUCCESS:
      state.projectListMap.set(
        action.meta,
        new ProjectListState(0, action.payload.data.datas)
      );
      console.log("map", state.projectListMap);
      return new State(state.projectListMap);
    
    default:
      return state;
  }
};

export { State, ProjectListState };
