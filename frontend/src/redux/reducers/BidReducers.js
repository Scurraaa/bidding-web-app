import * as ActionTypes from '../types/BidTypes'

const initial_state = {
    isLoading: false,
    errMess: null,
    bids: [],
    succMess: null
}

export const Bid = (state=initial_state, action) => {
    switch(action.type) {
        case ActionTypes.GET_BIDS_SUCCESS:
            return {
                ...state,
                bids: action.payload,
                isLoading: false,
                errMess: null,
            }
        case ActionTypes.GET_BIDS_LOADING:
            return {
                ...state,
                bids: [],
                isLoading: true,
                errMess: null,
            }
        case ActionTypes.GET_BIDS_FAILED:
            return {
                ...state,
                bids: [],
                isLoading: false,
                errMess: null,
                succMess: null
            }

        case ActionTypes.ADD_BID_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errMess: null,
                succMess: action.payload
            }
        case ActionTypes.ADD_BID_LOADING:
            return {
                ...state,
                isLoading: true,
                errMess: null,
                succMess: null
            }
        case ActionTypes.ADD_BID_FAILED:
            return {
                ...state,
                isLoading: false,
                errMess: action.payload,
                succMess: null
            }

        case ActionTypes.WITHDRAW_BID_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errMess: null,
                succMess: action.payload
            }
        case ActionTypes.WITHDRAW_BID_LOADING:
            return {
                ...state,
                isLoading: true,
                errMess: null,
                succMess: null
            }
        case ActionTypes.WITHDRAW_BID_FAILED:
            return {
                ...state,
                isLoading: false,
                errMess: action.payload,
                succMess: null
            }
        case ActionTypes.RESET:
            return {
                ...state,
                succMess: null
            }
        default:
            return state
    }

}