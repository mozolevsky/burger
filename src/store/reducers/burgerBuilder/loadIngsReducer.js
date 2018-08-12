export function loadIngrsReducer(state, action) {
    return {
        ...state,
        ingredients: action.ingredients,
        error: false
    }
}