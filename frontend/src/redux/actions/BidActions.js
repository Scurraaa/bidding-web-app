import * as ActionTypes from '../types/BidTypes'

export const getBids = (user_id, bid_status, token) => (dispatch) => {
    dispatch(getBidsLoading())
    if(bid_status) {
        return fetch(`/api/bids/?buyer=${user_id}&status=${bid_status}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        })
        .then(response => {
            if(!response.ok) {
                dispatch(getBidsFailed('HTTP status: '+response.status))
            } else {
                response.json().then(data => {
                    dispatch(getBidsSuccess(data))
                })
            }
        })
        .catch(error => {
            dispatch(getBidsFailed(error))
        })
    } else {
        return fetch(`/api/bids/?buyer=${user_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        })
        .then(response => {
            if(!response.ok) {
                dispatch(getBidsFailed('HTTP status: '+response.status))
            } else {
                response.json().then(data => {
                    dispatch(getBidsSuccess(data))
                })
            }
        })
        .catch(error => {
            dispatch(getBidsFailed(error))
        })
    }
}

export const getBidsSuccess = (response) => ({
    type: ActionTypes.GET_BIDS_SUCCESS,
    payload: response
})

export const getBidsLoading = () => ({
    type: ActionTypes.GET_BIDS_LOADING
})

export const getBidsFailed = (response) => ({
    type: ActionTypes.GET_BIDS_FAILED,
    payload: response
})

export const postBid = (data, props, token) => (dispatch) => {
    dispatch(postBidLoading())
    return fetch('/api/bids/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if(!response.ok) {
            dispatch(postBidFailed('HTTP POST status: '+response.status))
        } else {
            response.json().then(data => {
                dispatch(postBidSuccess('HTTP POST status: '+response.status))
                setTimeout(() => props.goBack(), 1000)
            })
        }
    })
    .catch(error => {
        dispatch(postBidFailed(error))
    })
}

export const postBidSuccess = (response) => ({
    type: ActionTypes.ADD_BID_SUCCESS,
    payload: response
})

export const postBidLoading = () => ({
    type: ActionTypes.ADD_BID_LOADING
})

export const postBidFailed = (response) => ({
    type: ActionTypes.ADD_BID_FAILED,
    payload: response
})

export const withdrawBid = (bid_id, props, token) => (dispatch) => {
    dispatch(withdrawBidLoading())
    return fetch(`/api/bids/${bid_id}/`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        }
    })
    .then(response => {
        if(!response.ok) {
            dispatch(withdrawBidFailed('HTTP DELETE status: '+response.status))
        } else {
            dispatch(withdrawBidSuccess('HTTP DELETE status: '+response.status))
            setTimeout(() => props.goBack(), 1000)
        }
    })
    .catch(error => {
        dispatch(withdrawBidFailed(error))
    })
}

export const withdrawBidSuccess = (response) => ({
    type: ActionTypes.WITHDRAW_BID_SUCCESS,
    payload: response
})

export const withdrawBidLoading = () => ({
    type: ActionTypes.WITHDRAW_BID_LOADING
})

export const withdrawBidFailed = (response) => ({
    type: ActionTypes.WITHDRAW_BID_FAILED,
    payload: response
})

export const resetSuccMess = () => ({
    type: ActionTypes.RESET,
})

