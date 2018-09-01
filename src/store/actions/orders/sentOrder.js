import {
    SENT_ORDER_SUCCESS,
    SENT_ORDER_FAIL,
    SEND_ORDER
} from '../actionTypes'
import axios from '../../../axios-orders';

export const sentOrderSuccess = (id, data) => {
    return {
        type: SENT_ORDER_SUCCESS,
        orderId: id,
        orderData: data
    }
}

export const sentOrderFail = error => {
    return {
        type: SENT_ORDER_FAIL,
        error: error
    }
}

export const sendOrderStart = () => {
    return {
        type: SEND_ORDER
    }
}

export const sentOrder = orderData => {
    return dispatch => {
        dispatch(sendOrderStart());
        axios.post('/orders.json', orderData)
            .then(res => {
                console.log(res.data)
                dispatch(sentOrderSuccess(res.data.name, orderData))
            })
            .catch(error => {
                dispatch(sentOrderFail(error))
            });
    }
}