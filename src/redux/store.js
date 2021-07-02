import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunkMiddleware from "redux-thunk"
import settingsReducer from "./settings-reducer";
import scoreReducer from "./score-reducer";
import {loadState, saveState} from "./localStorage";
import throttle from 'lodash.throttle';

let rootReducer = combineReducers({
    settingsReducer,
    scoreReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const persistedState = loadState()

const store = createStore(rootReducer, persistedState, composeEnhancers(applyMiddleware(thunkMiddleware)))
// @ts-ignore
store.subscribe(throttle(() => {
    saveState({
        ...store.getState()
    });
}, 1000))

window.__store__ = store
export default store


