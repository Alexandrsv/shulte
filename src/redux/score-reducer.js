import {addScore, getScore} from "../api/api";

const ADD_RESULT_TO_SCORE = 'score/ADD_RESULT_TO_SCORE'
const SET_SCORE_FROM_SERVER = 'score/SET_SCORE_FROM_SERVER'


let initialState = {
    score: [],
}
// {tableSize: 3, tableType: 'Цифры', isShuffleCells: false, timeOfPassing: '7.8', date: 1634392123814}

const scoreReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_RESULT_TO_SCORE:
            return {...state, score: [...state.score, action.payload]}
        case SET_SCORE_FROM_SERVER:
            const score = action.payload.map(s=>({...s, date:new Date(s.createdAt).getTime()}))
            return {...state, score}
        default:
            return state
    }
}


export const addResultToScore = ({size, tableType, isShuffleCells, timeOfPassing, date}) => ({
    type: ADD_RESULT_TO_SCORE,
    payload: {size, tableType, isShuffleCells, timeOfPassing, date}
})

export const setScoreFromServer = (score) => ({
    type: SET_SCORE_FROM_SERVER,
    payload: score
})

export const getScoreTH = (userId) => async (dispatch) => {
    let response = await getScore(userId)
    if (response) {
        dispatch(setScoreFromServer(response.data))
    }
}

export const addScoreTH = (timeOfPassing) => async (dispatch, getState) => {
    const settingsData = getState().settingsReducer
    let response = await addScore({...settingsData,timeOfPassing})
    if (response) {
        dispatch(addResultToScore({...settingsData,timeOfPassing, date:new Date().getTime()}))
    }
}


export default scoreReducer
