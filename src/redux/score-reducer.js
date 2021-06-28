import {addScore, getScore} from "../api/api";

const SET_SCORE = 'score/SET_SCORE'
const SET_SCORE_FROM_SERVER = 'score/SET_SCORE_FROM_SERVER'


let initialState = {
    score: [[]],
}
// add: 17
// size: 5
// time: 250
// utime: 1624883257

const scoreReducer = (state = initialState, action) => {
    console.log('action', action)
    switch (action.type) {
        case SET_SCORE:
            return {...state, score: [...state.score, [...action.payload]]}
        case SET_SCORE_FROM_SERVER:
            return {...state, score: action.payload.score}
        default:
            return state
    }
}

export const scoreActions = {

    addScore: (add, size, time, uTime) => ({
        type: SET_SCORE,
        payload: [add, size, time, uTime]
    }),
    setScoreFromServer: (score) => ({
        type: SET_SCORE,
        payload: score
    }),
}


export const getScoreTH = (userId) => async (dispatch) => {
    let response = await getScore(userId)
    if (!response) {
        dispatch(scoreActions.setScoreFromServer(response.score))
    }
}

export const addScoreTH = (size, time) => async (dispatch, getState) => {
    const size = getState().settingsReducer.size
    let response = await addScore(size, time)
    if (response) {
        dispatch(scoreActions.addScore(response.add, response.size, response.time, response.utime))
    }
}


export default scoreReducer
