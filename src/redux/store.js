import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import settingsReducer from "./settings-reducer";
import scoreReducer from "./score-reducer";
import { loadState } from "./localStorage";
import initReducer from "./init-reducer";
import { logger } from "../logger";

let rootReducer = combineReducers({
  settingsReducer,
  scoreReducer,
  initReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistedState = loadState();

const store = createStore(
  rootReducer,
  persistedState,
  composeEnhancers(applyMiddleware(thunkMiddleware))
);
// @ts-ignore
// store.subscribe(throttle(() => {
//     saveState({
//         ...store.getState()
//     });
// }, 1000))
store.subscribe(() => logger("STATE", store.getState()));

window.__store__ = store;
export default store;
