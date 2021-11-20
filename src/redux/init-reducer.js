import {getInit} from "../api/api";
import {getScoreTH} from "./score-reducer";
import {logger} from "../logger";

const SET_USER_INFO = 'init/SET_USER_INFO'
const UPDATE_OPEN_DATE = 'init/UPDATE_OPEN_DATE'


let initialState = {
    user: {
        uid: 0,
        name: 'Noname',
        sex: '4',
        source: null,
    },
    openDate: new Date(),
}


const initReducer = (state = initialState, action) => {
    logger('initReducer', action)
    switch (action.type) {
        case SET_USER_INFO:
            return {...state, user: {...action.payload}}
        case UPDATE_OPEN_DATE:
            return {...state, openDate: action.payload.openDate}
        default:
            return state
    }
}


export const setUserInfo = (user) => ({
    type: SET_USER_INFO,
    payload: {
        uid: user.uid,
        name: user.name,
        sex: user.sex,
        source: user.source
    }
})

export const updateOpenDate = () => ({
    type: UPDATE_OPEN_DATE,
    payload: {
        openDate: new Date()
    }
})


export const userInit = (userInfo) => async (dispatch) => {
    let response = await getInit(userInfo)
    await dispatch(getScoreTH(response.data.uid))
    if (response) {
        dispatch(setUserInfo(response.data))
    }
}
// tableSize
// tableType
// isShuffleCells
// timeOfPassing
// date

export default initReducer
