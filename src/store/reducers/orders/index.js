import * as actionTypes from '../../actions/actionTypes'
import {
    sendOrderSuccess, 
    sendOrderFail,
    sendOrder
} from './sentOrder'

const initialState = {
    orders: [],
    loading: true
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SEND_ORDER:
            return sendOrder(state, action)

        case actionTypes.SENT_ORDER_SUCCESS:
            return sendOrderSuccess(state, action)

        case actionTypes.SENT_ORDER_FAIL:
            return sendOrderFail(state, action)
            
        default: 
            return state;
    }
}

export default reducer;
