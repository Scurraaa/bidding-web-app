import * as ActionTypes from '../types/PaginationTypes'

export const bidSetCurrentPage = (page) => ({
    type:ActionTypes.BID_SET_CURRENT_PAGE, 
    payload:page
})

export const productSetCurrentPage = (page) => ({
    type:ActionTypes.PRODUCT_SET_CURRENT_PAGE, 
    payload:page
})

export const productBidSetCurrentPage = (page) => ({
    type:ActionTypes.PRODUCT_BID_SET_CURRENT_PAGE,
    payload: page
})