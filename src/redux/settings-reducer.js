const CHANGE_TABLE_SIZE = 'settings/CHANGE_TABLE_SIZE'


let initialState = {
    size: 3,
}


const settingsReducer = (state = initialState, action) => {
    console.log('action', action)
    switch (action.type) {
        case CHANGE_TABLE_SIZE:
            let newSize = action.payload.isIncrease ? state.size + 1 : state.size - 1
            if (newSize < 3) {
                newSize = 3
            }

            return {
                ...state,
                size: newSize < 3 ? 3 : newSize > 7 ? 7 : newSize,
            }
        default:
            return state
    }
}

export const settingsActions = {

    changeTableSize: (isIncrease) => ({
        type: CHANGE_TABLE_SIZE,
        payload: {isIncrease}
    }),
}


export default settingsReducer
