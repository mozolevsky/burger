
export function sendOrderSuccess(state, action) {
    const newOrder = {
        ...action.orderData,
        id: action.orderId
    }
    return {
        ...state,
        totalPrice: 0,
        loading: false,
        purchased: true,
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

export function purchaseInit(state, action) {
    return {
        ...state,
        purchased: false
    }
}