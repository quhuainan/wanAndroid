import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { reducer as ProjectReducer } from "./views/Project/index";
import { ProjectDetails } from "./views/Project/ProjectItem";
import { createEpicMiddleware } from "redux-observable";
import { rootEpic} from "./dataFlow/epic";
export class StoreBean {
  project = { projectList: [], refreshState: 0 };
}

const epicMiddleware = createEpicMiddleware();
const reducer = combineReducers({
  project: ProjectReducer
});

const middlewares = [epicMiddleware];
const storeEnhancers = compose(applyMiddleware(...middlewares));
const store = createStore(reducer, {}, storeEnhancers);
epicMiddleware.run(rootEpic);

export default store