import  {AuthLoginType, API} from '../api/api'
import {Dispatch} from 'redux'
import {setProfileAC} from './profileReducer'
import {setIsLogin} from "./authReducer";
import {change_statusAC, initializeAppTC, isInitializedAC} from './appReducer'

export enum ACTIONS_TYPE {
    SET_IS_LOGIN = 'loginReducer/SET-IS-LOGGED-IN',
    SET_IS_ERROR = 'loginReducer/SET-IS-ERROR',
}

const initialState = {
    isLoggedIn: false,
    error: '',
}
type InitialStateType = typeof initialState

export const loginReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case ACTIONS_TYPE.SET_IS_LOGIN:
            return {...state, isLoggedIn: action.value}
        case ACTIONS_TYPE.SET_IS_ERROR:
            return {...state, error: action.error}
        default:
            return state
    }
}

// actions
export const setIsLoggedInAC = (value: boolean) => ({type: ACTIONS_TYPE.SET_IS_LOGIN, value} as const)
export const setIsErrorAC = (error: string) => ({type: ACTIONS_TYPE.SET_IS_ERROR, error} as const)

//thunks
export const loginTC = (data: AuthLoginType) => (dispatch: Dispatch) => {
    dispatch(change_statusAC('loading'))
    API.login(data.email, data.password, data.rememberMe)
        .then(res => {

            dispatch(setIsLoggedInAC(true))
            dispatch(setIsLogin(true))
            dispatch(isInitializedAC(true))
            dispatch(setProfileAC(res))
            initializeAppTC()
            dispatch(change_statusAC('success'))

        })
        .catch(err => {
            dispatch(change_statusAC('failed'))
            dispatch(setIsErrorAC(err.error))
        })
}
export const logOutTC = () => (dispatch: Dispatch) => {
    API.logOut()
        .then(res => {
            dispatch(change_statusAC('loading'))
            dispatch(setIsLoggedInAC(false))
            dispatch(setIsLogin(false))
            dispatch(isInitializedAC(false))
            dispatch(change_statusAC('success'))
        })
        .catch(err => {
            dispatch(change_statusAC('failed'))
            dispatch(setIsErrorAC(err.error))
        })
}

//types
type ActionsType = ReturnType<typeof setIsLoggedInAC> | ReturnType<typeof setIsErrorAC>


