import * as ActionTypes from '../types/PaginationTypes'

const initial_state = {
    bids_currentPage: 1,
    products_currentPage: 1,
    products_bid_currentPage: 1
}

export const Pagination = (state = initial_state, action) => {
    switch(action.type) {
        case ActionTypes.BID_SET_CURRENT_PAGE:
            return {
                ...state,
                bids_currentPage: action.payload
            }
        case ActionTypes.PRODUCT_SET_CURRENT_PAGE:
            return {
                ...state,
                products_currentPage: action.payload
            }
        case ActionTypes.PRODUCT_BID_SET_CURRENT_PAGE:
            return {
                ...state,
                products_bid_currentPage: action.payload
            }
        default:
            return state
    }
}