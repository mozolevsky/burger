import {ADD_INGREDIENT} from '../actionTypes'

export const addIngredient = ingName => {
    return {
        type: ADD_INGREDIENT,
        ingredientName: ingName
    }
}