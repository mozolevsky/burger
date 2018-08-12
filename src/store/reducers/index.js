import {initialState, INGREDIENT_PRICES} from '../initialData'
import * as actionTypes from '../actions/actionTypes'
import {removeIngredientReducer} from './burgerBuilder/removeIngredientReducer'
import {addIngredientReducer} from './burgerBuilder/addIngredientReducer'
import {loadIngrsReducer} from './burgerBuilder/loadIngsReducer'
import {faildToFechIngsReducer} from './burgerBuilder/fiaildIngsFechReducer';

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case  actionTypes.ADD_INGREDIENT:
            return addIngredientReducer(state, action, INGREDIENT_PRICES);

        case  actionTypes.REMOVE_INGREDIENT:
            return removeIngredientReducer(state, action, INGREDIENT_PRICES)

        case actionTypes.INIT_ENGREDIENTS:
            return loadIngrsReducer(state, action)

        case actionTypes.FECH_INGREDIENTS_FAILD:
            return faildToFechIngsReducer(state, action)

        default:
            return state;
    }
}

