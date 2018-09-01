
export function sendOrderSuccess(state, action) {
    const newOrder = {
        ...action.orderData,
        id: action.orderId
    }
    return {
        ...state,
        loading: false, 
        orders: state.orders.concat(newOrder)
    }
}

export function sendOrderFail(state, action) {
    return {
        ...state,
        loading: false
    }
}

export function sendOrder(state, action) {
    return {
        ...state,
        loading: true
    }
}