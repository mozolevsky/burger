export function faildToFechIngsReducer(state, action) {
    return {
        ...state,
        error: true
    }
}