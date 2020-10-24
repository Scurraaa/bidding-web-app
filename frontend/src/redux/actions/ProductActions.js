import * as ActionTypes from '../types/ProductTypes'
import { resetSuccMess } from './BidActions'

export const getProducts = (user_id, product_status, token) => (dispatch) => {
    dispatch(getProductsLoading())
    if(product_status && user_id) {
        return fetch(`/api/products/?seller=${user_id}&status=${product_status}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        })
        .then(response => {
            if(!response.ok) {
                dispatch(getProductsFailed('HTTP status: '+response.status))
            } else {
                response.json().then(data => {
                    dispatch(getProductsSuccess(data))
                })
            }
        })
        .catch(error => {
            dispatch(getProductsFailed(error))
        })
    } else if (user_id) {
        return fetch(`/api/products/?seller=${user_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        })
        .then(response => {
            if(!response.ok) {
                dispatch(getProductsFailed('HTTP status: '+response.status))
            } else {
                response.json().then(data => {
                    dispatch(getProductsSuccess(data))
                })
            }
        })
        .catch(error => {
            dispatch(getProductsFailed(error))
        })
    } else {
        return fetch(`/api/products/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        })
        .then(response => {
            if(!response.ok) {
                dispatch(getProductsFailed('HTTP status: '+response.status))
            } else {
                response.json().then(data => {
                    dispatch(getProductsSuccess(data))
                    dispatch(resetSuccMess())
                })
            }
        })
        .catch(error => {
            dispatch(getProductsFailed(error))
        })
    }
}

export const getProductsSuccess = (response) => ({
    type: ActionTypes.GET_PRODUCTS_SUCCESS,
    payload: response
})

export const getProductsLoading = () => ({
    type: ActionTypes.GET_PRODUCTS_LOADING
})

export const getProductsFailed = (response) => ({
    type: ActionTypes.GET_PRODUCTS_FAILED,
    payload: response
})

export const getProduct = (product_id, token) => (dispatch) => {
    dispatch(getProductLoading())
    return fetch(`/api/products/${product_id}/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        }
    })
    .then (response => {
        if(!response.ok) {
            dispatch(getProductFailed('HTTP status: '+response.status))
        } else {
            response.json().then(data => {
                dispatch(getProductSuccess(data))
            })
        }
    })
    .catch(error => {
        dispatch(getProductFailed(error))
    })
}

export const getProductSuccess = (response) => ({
    type: ActionTypes.GET_PRODUCT_SUCCESS,
    payload: response
})

export const getProductLoading = () => ({
    type: ActionTypes.GET_PRODUCT_LOADING
})

export const getProductFailed = (response) => ({
    type: ActionTypes.GET_PRODUCT_FAILED,
    payload: response
})

export const postProduct = (data, props, token) => (dispatch) => {
    dispatch(postProductLoading())
    const formData = new FormData()
    if(data.image) {
        formData.append('name', data.name)
        formData.append('description', data.description)
        formData.append('minimum_bid', data.minimum_bid)
        formData.append('maximum_bid', data.maximum_bid)
        formData.append('user', data.user)
        formData.append('expiry_date', data.expiry_date)
        formData.append('image', data.image)
    } else {
        formData.append('name', data.name)
        formData.append('description', data.description)
        formData.append('minimum_bid', data.minimum_bid)
        formData.append('maximum_bid', data.maximum_bid)
        formData.append('user', data.user)
        formData.append('expiry_date', data.expiry_date)
    }

    return fetch('/api/products/', {
        method: 'POST',
        headers: {
            'Authorization': `Token ${token}`
        },
        body: formData
    })
    .then(response => {
        if(!response.ok) {
            dispatch(postProductFailed('HTTP POST status: '+response.status))
        } else {
            response.json().then(data => {
                dispatch(postProductSuccess('HTTP POST status: '+response.status))
                setTimeout(() => props.go(0), 1000)
            })
        }
    })
    .catch(error => {
        dispatch(postProductFailed(error))
    })
}

export const postProductSuccess = (response) => ({
    type: ActionTypes.ADD_PRODUCT_SUCCESS,
    payload: response
})

export const postProductLoading = () => ({
    type: ActionTypes.ADD_PRODUCT_LOADING
})

export const postProductFailed = (response) => ({
    type: ActionTypes.ADD_PRODUCT_FAILED,
    payload: response
})

export const deleteProduct = (product_id, props, token) => (dispatch) => {
    dispatch(deleteProductLoading())
    return fetch(`/api/products/${product_id}/`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        }
    })
    .then(response => {
        if(!response.ok) {
            dispatch(deleteProductFailed('HTTP DELETE status: '+response.status))
        } else {
            dispatch(deleteProductSuccess('HTTP DELETE status: '+response.status))
            setTimeout(() => props.go(0), 1000)
        }
    })
    .catch(error => {
        dispatch(deleteProductFailed(error))
    })
}

export const deleteProductSuccess = (response) => ({
    type: ActionTypes.DELETE_PRODUCT_SUCCESS,
    payload: response
})

export const deleteProductLoading = () => ({
    type: ActionTypes.DELETE_PRODUCT_LOADING,
})

export const deleteProductFailed = (response) => ({
    type: ActionTypes.DELETE_PRODUCT_FAILED,
    payload: response
})

export const editProduct = (product_id, data, props, token) => (dispatch) => {
    dispatch(editProductLoading())
    const formData = new FormData()
    if(data.image) {
        formData.append('name', data.name)
        formData.append('description', data.description)
        formData.append('minimum_bid', data.minimum_bid)
        formData.append('maximum_bid', data.maximum_bid)
        formData.append('user', data.user)
        formData.append('expiry_date', data.expiry_date)
        formData.append('image', data.image)
    } else {
        formData.append('name', data.name)
        formData.append('description', data.description)
        formData.append('minimum_bid', data.minimum_bid)
        formData.append('maximum_bid', data.maximum_bid)
        formData.append('user', data.user)
        formData.append('expiry_date', data.expiry_date)
    }
    return fetch(`/api/products/${product_id}/`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Token ${token}`
        },
        body: formData
    })
    .then(response => {
        if(!response.ok) {
            dispatch(editProductFailed('HTTP PATCH status: '+response.status))
        } else {
            response.json().then(data => {
                dispatch(editProductSuccess('HTTP PATCH status: '+response.status))
                setTimeout(() => props.go(0), 1000)
            })
        }
    })
    .catch(error => {
        dispatch(editProductFailed(error))
    })
}

export const editProductSuccess = (response) => ({
    type: ActionTypes.EDIT_PRODUCT_SUCCESS,
    payload: response
})

export const editProductLoading = () => ({
    type: ActionTypes.EDIT_PRODUCT_LOADING
})

export const editProductFailed = (response) => ({
    type: ActionTypes.EDIT_PRODUCT_FAILED,
    payload: response
})

export const getProductBids = (product_id, buyer_id, token) => (dispatch) => {
    dispatch(getProductBidsLoading())
    if(buyer_id) {
        return fetch(`/api/products/bids/?product=${product_id}&buyer_id=${buyer_id}`,{
            method: 'GET',
            headers: {
                'Contnet-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        })
        .then(response => {
            if(!response.ok) {
                dispatch(getProductBidsFailed('HTTP status: '+response.status))
            } else {
                response.json().then(data => {
                    dispatch(getProductBidsSuccess(data))
                })
            }
        })
        .catch(error => {
            dispatch(getProductBidsFailed(error))
        })
    } else {
        return fetch(`/api/products/bids/?product=${product_id}`,{
            method: 'GET',
            headers: {
                'Contnet-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        })
        .then(response => {
            if(!response.ok) {
                dispatch(getProductBidsFailed('HTTP status: '+response.status))
            } else {
                response.json().then(data => {
                    dispatch(getProductBidsSuccess(data))
                })
            }
        })
        .catch(error => {
            dispatch(getProductBidsFailed(error))
        })
    }
}

export const getProductBidsSuccess = (response) => ({
    type: ActionTypes.GET_PRODUCT_BIDS_SUCCESS,
    payload: response
})

export const getProductBidsLoading = () => ({
    type: ActionTypes.GET_PRODUCT_BIDS_LOADING
})

export const getProductBidsFailed = (response) => ({
    type: ActionTypes.GET_PRODUCT_BIDS_FAILED,
    payload: response
})

export const selectBid = (product_id, bid_id, token) => (dispatch) => {
    dispatch(selectBidLoading())
    return fetch(`/api/products/select/?product=${product_id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify(bid_id)
    })
    .then(response => {
        if(!response.ok) {
            dispatch(selectBidFailed('HTTP POST status: '+response.status))
        } else {
            dispatch(selectBidSuccess('HTTP POST status: '+response.status))
        }
    })
    .catch(error => {
        dispatch(selectBidFailed(error))
    }) 
}

export const selectBidSuccess = (response) => ({
    type: ActionTypes.SELECT_BID_SUCCESS,
    payload: response
})

export const selectBidLoading = () => ({
    type: ActionTypes.SELECT_BID_LOADING,
})

export const selectBidFailed = (response) => ({
    type: ActionTypes.SELECT_BID_FAILED,
    payload: response
})