import {getInit} from "../api/api";

const SET_USER_INFO = 'init/SET_USER_INFO'


let initialState = {
    user: {
        uid: 0,
        name: 'Noname',
        sex: '4',
        source: null,
    },
}


const initReducer = (state = initialState, action) => {
    console.log('initReducer', action)
    switch (action.type) {
        case SET_USER_INFO:
            return {...state, user: {...action.payload.user}}
        default:
            return state
    }
}


export const setUserInfo = (user) => ({
    type: SET_USER_INFO,
    payload: {user}
})


export const userInit = (userInfo) => async (dispatch) => {
    let response = await getInit(userInfo)
    console.log('response', response)
    if (response) {
        dispatch(setUserInfo(response.score))
    }
}


export default initReducer
