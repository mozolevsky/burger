import {
    INIT_ENGREDIENTS,
    FECH_INGREDIENTS_FAILD
} from '../actionTypes'
import axios from '../../../axios-orders';


export const initIngrs = ingrs => {
    return {
        type: INIT_ENGREDIENTS,
        ingredients: ingrs
    }
}

export const fechIngsFaild = () => {
    return {
        type: FECH_INGREDIENTS_FAILD,
        error: true
    }
}

export const loadIngsFromServer = () => {
    return dispatch => {
        axios.get('ingredients.json')
            .then(res => dispatch(initIngrs(res.data)))
            .catch(e => dispatch(fechIngsFaild()))
    }
}