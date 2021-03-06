import {toFixNumber} from '../../../utils/utils'

export function addIngredientReducer(state, action, prices) {
    let updatedTotalPrice = state.totalPrice + prices[action.ingredientName];

    return {
        ...state,
        ingredients: {
            ...state.ingredients,
            [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        totalPrice: toFixNumber(updatedTotalPrice),
        purchasable: Boolean(updatedTotalPrice)
    }
}

