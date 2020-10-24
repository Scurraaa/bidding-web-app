import * as ActionTypes from '../types/AuthTypes'

export const postLogin = (data, props) => (dispatch) => {
    dispatch(loginLoading())
    return fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            dispatch(loginFailed('HTTP status: ' + response.status))
        } else {
            response.json().then(data => {
                dispatch(loginSuccess(data))
                props.push('dashboard/products')
            })
        }
    })
    .catch(error => {
        dispatch(loginFailed(error))
    })
}

export const loginLoading = () => ({
    type: ActionTypes.LOGIN_LOADING
})

export const loginSuccess = (response) => ({
    type: ActionTypes.LOGIN_SUCCESS,
    payload: response
})

export const loginFailed = (response) => ({
    type: ActionTypes.LOGIN_FAILED,
    payload: response
})

export const postLogout = (data, props) => (dispatch) => {
    dispatch(logoutLoading())
    return fetch('/api/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("HTTP status " + response.status);
        }
        return response.json();
    })
    .then(data => {
        dispatch(logoutSuccess(data))
        props.push('/')
    })
    .catch(error => {
        dispatch(logoutFailed(error))
    })
}

export const logoutLoading = () => ({
    type: ActionTypes.LOGOUT_LOADING
})

export const logoutFailed = (errmess) => ({
    type: ActionTypes.LOGOUT_FAILED,
    payload: errmess
})

export const logoutSuccess = () => ({
    type: ActionTypes.LOGOUT_SUCCESS
})

export const postSignup = (data) => (dispatch) => {
    dispatch(postSignupLoading())
    return fetch('/api/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if(!response.ok) {
            dispatch(postSignupFailed('HTTP POST status: '+response.status))
        } else {
            response.json().then(data => {
                dispatch(postSignupSuccess('HTTP POST status: '+response.status))
            })
        }
    })
    .catch(error => {
        dispatch(postSignupFailed(error))
    })
}

export const postSignupSuccess = (response) => ({
    type: ActionTypes.SIGNUP_SUCCESS,
    payload: response
})

export const postSignupLoading = () => ({
    type: ActionTypes.SIGNUP_LOADING
})

export const postSignupFailed = (response) => ({
    type: ActionTypes.SIGNUP_FAILED,
    payload: response
})

export const updateCredentials = (data, props) => (dispatch) => {
    dispatch(updateLoading())
    return fetch('/api/update', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            dispatch(updateFailed('HTTP status: ' + response.status))
        } else {
            response.json().then(data => {
                dispatch(updateSuccess(data))
            })
        }
    })
    .catch(error => {
        dispatch(updateFailed(error))
    })
}

export const updateLoading = () => ({
    type: ActionTypes.UPDATE_CREDENTIALS_LOADING
})

export const updateSuccess = (response) => ({
    type: ActionTypes.UPDATE_CREDENTIALS_SUCCESS,
    payload: response
})

export const updateFailed = (response) => ({
    type: ActionTypes.UPDATE_CREDENTIALS_FAILED,
    payload: response
})
