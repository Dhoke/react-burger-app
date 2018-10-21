import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility';

const initialState = {
    orders: [],
    loading: false,
    purchased: false,
}

const purchaseBurgerSuccess = (state, action) => {
    const newOrder = {
        ...action.actionData,
        id: action.orderId
    }
    const updatedOrders = state.orders.concat(newOrder);

    return updateObject(state, { loading: false, orders: updatedOrders, purchased: true })

}

const orderReducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.FETCH_ORDERS_FAILED:
            return updateObject(state, { loading: false })

        case actionTypes.FETCH_ORDERS_SUCCESS:
            return updateObject(state, { orders: action.orders, loading: false })

        case actionTypes.FETCH_ORDERS_INIT:
            return updateObject(state, { loading: true })

        case actionTypes.PURCHASE_INIT:
            return updateObject(state, { purchased: false })

        case actionTypes.PURCHASE_BURGER_ASYNC:
            return updateObject(state, { loading: true })

        case actionTypes.PURCHASE_BURGER_SUCCESS:
            return purchaseBurgerSuccess(state, action)

        case actionTypes.PURCHASE_BURGER_FAILED:
            return updateObject(state, { loading: false })

        default:
            return state;
    }
}

export default orderReducer;