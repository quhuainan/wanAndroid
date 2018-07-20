import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { reducer as ProjectReducer } from "./views/Project/index";
import { reducer as ErrorReducer } from "./uiComponent/GlobalEventView/ExceptionHandlerView";
import { createEpicMiddleware } from "redux-observable";
import { rootEpic } from "./dataFlow/epic";
import { createArenaStore } from "redux-arena";

export class StoreBean {
  project = { projectList: [], refreshState: 0 };
}

const epicMiddleware = createEpicMiddleware();
console.log(" ErrorReducer", ErrorReducer);
const reducer = combineReducers({
  projectMap: ProjectReducer,
  error: ErrorReducer
});

const middlewares = [epicMiddleware];
const storeEnhancers = compose(applyMiddleware(...middlewares));
const store = createStore(reducer, {}, storeEnhancers);
epicMiddleware.run(rootEpic);

export default store;
