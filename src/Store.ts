import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { reducer as ProjectReducer } from "./views/Project/index";
import { AppReducer } from "./base";

import { createEpicMiddleware } from "redux-observable";
import { rootEpic } from "./base";
import { HomeBannerReducer } from "./businessComponet/banner";
import { ArticalListReducer } from "./businessComponet/articalList";

export class StoreBean {
  project = { projectList: [], refreshState: 0 };
}

const epicMiddleware = createEpicMiddleware();
const reducer = combineReducers({
  projectMap: ProjectReducer,
  app: AppReducer,
  homeBanner: HomeBannerReducer,
  articalList: ArticalListReducer
});

const middlewares = [epicMiddleware];
const storeEnhancers = compose(applyMiddleware(...middlewares));
const store = createStore(reducer, {}, storeEnhancers);
epicMiddleware.run(rootEpic);

export default store;
