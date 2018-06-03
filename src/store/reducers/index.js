import {initialState, INGREDIENT_PRICES} from '../initialData'
import * as actionTypes from '../actions'
import {removeIngredientReducer} from './removeIngredientReducer'
import {addIngredientReducer} from './addIngredientReducer'

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case  actionTypes.ADD_INGREDIENT:
            return addIngredientReducer(state, action, INGREDIENT_PRICES);

        case  actionTypes.REMOVE_INGREDIENT:
            return removeIngredientReducer(state, action, INGREDIENT_PRICES)

        default:
            return state;
    }
}

