import * as ActionTypes from '../types/AuthTypes'

const initial_state = {
    isLoading: false,
    errMess: null,
    credentials: [],
    isAuthenticated: false,
    succMess: null,
}

export const Auth = (state = initial_state, action) => {
    switch(action.type) {
        case ActionTypes.LOGIN_SUCCESS:
            return {...state, 
                isLoading: false, 
                errMess: null, 
                credentials: action.payload, 
                isAuthenticated: true
            }
        case ActionTypes.LOGIN_FAILED:
            return {...state, 
                isLoading: false, 
                errMess: action.payload, 
                credentials: [], 
                isAuthenticated: false
            }
        case ActionTypes.LOGIN_LOADING: 
            return {...state,
                isLoading: true,
                errMess: null,
                credentials: [],
                isAuthenticated: false
        }
        case ActionTypes.LOGOUT_SUCCESS:
            return {...state, 
                isLoading: false, 
                errMess: null, 
                credentials: [], 
                isAuthenticated: false
            }
        case ActionTypes.LOGOUT_FAILED:
            return {...state, 
                isLoading: false, 
                errMess: null, 
                credentials: [], 
                isAuthenticated: false
            }
        case ActionTypes.LOGOUT_LOADING: 
            return {...state,
                isLoading: true,
                errMess: null,
                credentials: [],
                isAuthenticated: false
        }
        case ActionTypes.SIGNUP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errMess: null,
                succMess: action.payload
            }
        case ActionTypes.SIGNUP_LOADING:
            return {
                ...state,
                isLoading: true,
                errMess: null,
                succMess: null,
            }
        case ActionTypes.SIGNUP_FAILED:
            return {
                ...state,
                isLoading: false,
                errMess: action.payload,
                succMess: null
            }
        case ActionTypes.UPDATE_CREDENTIALS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                credentials: action.payload,
                errMess: null,
                succMess: null
            }
        case ActionTypes.UPDATE_CREDENTIALS_LOADING:
            return {
                ...state,
                isLoading: true,
                errMess:null,
                succMess: null
            }
        case ActionTypes.UPDATE_CREDENTIALS_FAILED:
            return {
                ...state,
                isLoading: false,
                errMess: null,
                succMess: null
            }
        default:
            return state
    }
}