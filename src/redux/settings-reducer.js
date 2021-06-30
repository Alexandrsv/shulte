const CHANGE_TABLE_SIZE = 'settings/CHANGE_TABLE_SIZE'
const CHANGE_TABLE_TYPE = 'settings/CHANGE_TABLE_TYPE'
const CHANGE_SHUFFLE_CELLS = 'settings/CHANGE_SHUFFLE_CELLS'
const CHANGE_VIBED = 'settings/CHANGE_VIBED'
const CHANGE_SOUND = 'settings/CHANGE_SOUND'


let initialState = {
    size: 3,
    tableType: 'Цифры',
    isShuffleCells: false,
    isVibed: true,
    isSound: true,
}


const settingsReducer = (state = initialState, action) => {
    console.log('settingsReducer', action)
    switch (action.type) {
        case CHANGE_TABLE_SIZE:
            let newSize = action.payload.size
            return {
                ...state,
                size: newSize < 3 ? 3 : newSize > 7 ? 7 : newSize,
            }
        case CHANGE_TABLE_TYPE:
            return {
                ...state,
                tableType: action.payload.tableType,
            }
        case CHANGE_SHUFFLE_CELLS:
            return {
                ...state,
                isShuffleCells: action.payload.isShuffleCells,
            }
        case CHANGE_VIBED:
            return {
                ...state,
                isVibed: action.payload.isVibed,
            }
        case CHANGE_SOUND:
            return {
                ...state,
                isSound: action.payload.isSound,
            }
        default:
            return state
    }
}

export const changeTableSize = (size) => ({
    type: CHANGE_TABLE_SIZE,
    payload: {size}
})

export const changeTableType = (tableType) => ({
    type: CHANGE_TABLE_TYPE,
    payload: {tableType}
})

export const changeShuffleCells = (isShuffleCells) => ({
    type: CHANGE_SHUFFLE_CELLS,
    payload: {isShuffleCells}
})

export const changeVibed = (isVibed) => ({
    type: CHANGE_VIBED,
    payload: {isVibed}
})

export const changeSound = (isSound) => ({
    type: CHANGE_SOUND,
    payload: {isSound}
})


export default settingsReducer
