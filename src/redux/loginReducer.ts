import API, {AuthLoginType} from "../api/api"
import {Dispatch} from 'redux'

export enum ACTIONS_TYPE {
    SET_IS_LOGIN = 'loginReducer/SET-IS-LOGGED-IN',
    SET_IS_ERROR = 'loginReducer/SET-IS-ERROR',
}

const initialState = {
    isLoggedIn: false,
    error: ''
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
export const loginTC = (data: AuthLoginType) => (dispatch: Dispatch<ActionsType>) => {
    API.login(data).then(res => {
        if (!res.error) {
            dispatch(setIsLoggedInAC(true));
        } else {
            dispatch(setIsErrorAC(res.error))
        }
    })
}
type ActionsType = ReturnType<typeof setIsLoggedInAC> | ReturnType<typeof setIsErrorAC>

