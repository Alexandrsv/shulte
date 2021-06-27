import {getScore} from "../api/api";

const SET_SCORE = 'score/SET_SCORE'


let initialState = {
    score: 3,
}


const scoreReducer = (state = initialState, action) => {
    console.log('action', action)
    switch (action.type) {
        case SET_SCORE:

            return {
                ...state,
            }
        default:
            return state
    }
}

export const settingsActions = {

    changeTableSize: (isIncrease) => ({
        type: SET_SCORE,
        payload: {isIncrease}
    }),
}


export const getScoreTH = (userId) => async (dispatch) => {

    let response = await getScore(userId)
    console.log('response',response)
    if (response) {
        console.log('response2',response.say)
        // let {id, login, email} = response.data
        // dispatch(actions.setAuthUserData(id, email, login, true))
    }
}


export default scoreReducer
