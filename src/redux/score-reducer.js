import {addScore, getScore} from "../api/api";
import {logger} from "../logger";

const ADD_RESULT_TO_SCORE = 'score/ADD_RESULT_TO_SCORE'
const SET_SCORE_FROM_SERVER = 'score/SET_SCORE_FROM_SERVER'


let initialState = {
    score: [],
}
// {tableSize: 3, tableType: 'Цифры', isShuffleCells: false, timeOfPassing: '7.8', date: 1634392123814}

const scoreReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_RESULT_TO_SCORE:
            return {
                ...state, score: [...state.score, action.payload]
                    .sort((a, b) => (a.createdAt > b.createdAt) ? 1 : ((b.createdAt > a.createdAt) ? -1 : 0))
            }
        case SET_SCORE_FROM_SERVER:
            const score = action.payload.map(s => ({...s, date: new Date(s.createdAt).getTime()}))
                .sort((a, b) => (a.createdAt > b.createdAt) ? 1 : ((b.createdAt > a.createdAt) ? -1 : 0))
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

export const getScoreTH = (userId) => async (dispatch, getState) => {
    const {initUid} = getState().initReducer.user;
    const uid = initUid ? initUid : userId
    logger('SSSSTTTT', uid)
    let response = await getScore(uid)
    if (response) {
        dispatch(setScoreFromServer(response.data))
    }
}

export const addScoreTH = (timeOfPassing) => async (dispatch, getState) => {
    const settingsData = getState().settingsReducer
    let response = await addScore({...settingsData, timeOfPassing})
    if (response) {
        dispatch(addResultToScore({...settingsData, timeOfPassing, date: new Date().getTime()}))
    }
}


export default scoreReducer
