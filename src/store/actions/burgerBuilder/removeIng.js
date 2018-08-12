import {REMOVE_INGREDIENT} from '../actionTypes'

export const removeIngredient = ingName => {
    return {
        type: REMOVE_INGREDIENT,
        ingredientName: ingName
    }
}