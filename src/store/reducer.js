import * as actionTypes from './actions';
import {toFixNumber} from '../utils/utils'

const initialState = {
    ingredients: {
        salad: 0,
        cheese: 0, 
        bacon: 0,
        meat: 0
    },
    totalPrice: 0,
    purchasable: false
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.6,
    meat: 1.5,
    bacon: 0.7
}

const reducer = (state = initialState, action) => {
    let updatedTotalPrice;

    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            updatedTotalPrice = state.totalPrice + INGREDIENT_PRICES[action.ingredientName];

            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: toFixNumber(updatedTotalPrice),
                purchasable: Boolean(updatedTotalPrice)
            }
        case actionTypes.REMOVE_INGREDIENT:
            updatedTotalPrice = state.totalPrice - INGREDIENT_PRICES[action.ingredientName];

            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] > 0 ?
                                             state.ingredients[action.ingredientName] - 1 : 0
                },
                totalPrice: toFixNumber(updatedTotalPrice),
                purchasable: Boolean(updatedTotalPrice)
            }
        default:
            return state;
    }
};

export default reducer;
