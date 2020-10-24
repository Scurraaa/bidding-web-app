import * as ActionTypes from '../types/ProductTypes'

const initial_state = {
    isLoading: false,
    products: [],
    product: [],
    product_bids: [],
    errMess: null,
    succMess: null,
}

export const Product = (state = initial_state, action) => {
    switch(action.type) {
        case ActionTypes.GET_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: action.payload,
                isLoading: false,
                errMess: null,
                succMess: null,
            }
        case ActionTypes.GET_PRODUCTS_LOADING:
            return {
                ...state,
                products: [],
                isLoading: true,
                errMess: null
            }
        case ActionTypes.GET_PRODUCTS_FAILED:
            return {
                ...state,
                products: [],
                isLoading: false,
                errMess: action.payload
            }
        case ActionTypes.GET_PRODUCT_SUCCESS:
            return {
                ...state,
                product: action.payload,
                isLoading: false,
                errMess: null,
                succMess: null,
            }
        case ActionTypes.GET_PRODUCT_LOADING:
            return {
                ...state,
                product: [],
                isLoading: true,
                errMess: null
            }
        case ActionTypes.GET_PRODUCT_FAILED:
            return {
                ...state,
                product: [],
                isLoading: false,
                errMess: action.payload
            }
        case ActionTypes.GET_PRODUCT_BIDS_SUCCESS:
            return {
                ...state,
                product_bids: action.payload,
                isLoading: false,
                errMess: null,
                succMess: null,
            }
        case ActionTypes.GET_PRODUCT_BIDS_LOADING:
            return {
                ...state,
                product_bids: [],
                isLoading: true,
                errMess: null
            }
        case ActionTypes.GET_PRODUCT_BIDS_FAILED:
            return {
                ...state,
                product_bids: [],
                isLoading: false,
                errMess: action.payload
            }
        case ActionTypes.ADD_PRODUCT_SUCCESS:
            return {
                ...state,
                products: [],
                isLoading: false,
                errMess: null,
                succMess: action.payload
            }
        case ActionTypes.ADD_PRODUCT_LOADING:
            return {
                ...state,
                products: [],
                isLoading: true,
                errMess: null,
                succMess: null
            }
        case ActionTypes.ADD_PRODUCT_FAILED:
            return {
                ...state,
                products: [],
                isLoading: false,
                errMess: action.payload,
                succMess: null
            }
        case ActionTypes.DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errMess: null,
                succMess: action.payload
            }
        case ActionTypes.DELETE_PRODUCT_LOADING:
            return {
                ...state,
                isLoading: true,
                errMess: null,
                succMess: null
            }
        case ActionTypes.DELETE_PRODUCT_FAILED:
            return {
                ...state,
                isLoading: false,
                errMess: action.payload,
                succMess: null
            }
        case ActionTypes.EDIT_PRODUCT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errMess: null,
                succMess: action.payload
            }
        case ActionTypes.EDIT_PRODUCT_LOADING:
            return {
                ...state,
                isLoading: true,
                errMess: null,
                succMess: null
            }
        case ActionTypes.EDIT_PRODUCT_FAILED:
            return {
                ...state,
                isLoading: false,
                errMess: action.payload,
                succMess: null
            }
        case ActionTypes.SELECT_BID_SUCCESS:
            return {
                ...state,
                isLoading: false,
                succMess: action.payload
            }
        case ActionTypes.SELECT_BID_LOADING:
            return {
                ...state,
                isLoading: true,
                succMess: null
            }
        case ActionTypes.SELECT_BID_FAILED:
            return {
                ...state,
                isLoading: false,
                succMess: null,
                errMess: action.payload
            }
        default: 
            return state
    }
}

