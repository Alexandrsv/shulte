import {addScore, getScore} from "../api/api";

const ADD_RESULT_TO_SCORE = 'score/ADD_RESULT_TO_SCORE'
const SET_SCORE_FROM_SERVER = 'score/SET_SCORE_FROM_SERVER'


let initialState = {
    score: [],
}
// add: 17
// size: 5
// time: 250
// utime: 1624883257

const scoreReducer = (state = initialState, action) => {
    console.log('scoreReducer', action)
    switch (action.type) {
        case ADD_RESULT_TO_SCORE:
            return {...state, score: [...state.score, action.payload]}
        case SET_SCORE_FROM_SERVER:
            return {...state, score: action.payload}
        default:
            return state
    }
}


export const addResultToScore = (tableSize, tableType, isShuffleCells, timeOfPassing, date) => ({
    type: ADD_RESULT_TO_SCORE,
    payload: {tableSize, tableType, isShuffleCells, timeOfPassing, date}
})

export const setScoreFromServer = (score) => ({
    type: SET_SCORE_FROM_SERVER,
    payload: score
})

export const getScoreTH = (userId) => async (dispatch) => {
    let response = await getScore(userId)
    if (response) {
        dispatch(setScoreFromServer(response.score))
    }
}

export const addScoreTH = (time) => async (dispatch, getState) => {
    const size = getState().settingsReducer.size
    let response = await addScore(size, time)
    if (response) {
        dispatch(addResultToScore(response.size, response.time, response.utime))
    }
}


export default scoreReducer
