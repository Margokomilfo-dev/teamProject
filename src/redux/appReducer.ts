import {Dispatch} from 'redux'
import {API} from "../api/api";

export enum ACTIONS_TYPE {
    SET_INITIALIZED_APP = 'appReducer/SET_INITIALIZED_APP',
    CHANGE_STATUS= 'appReducer/CHANGE_STATUS',
}
type StatusType = 'idle' | 'loading' | 'success' | 'failed'
const initialState = {
    isInitialized: false,
    status: 'idle' as StatusType,
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case ACTIONS_TYPE.SET_INITIALIZED_APP:
            return {...state, isInitialized: action.value}
        case ACTIONS_TYPE.CHANGE_STATUS:
            return {...state, status: action.value}
        default:
            return state
    }
}
export const isInitializedAC = (value: boolean) => ({type: ACTIONS_TYPE.SET_INITIALIZED_APP, value} as const)
export const change_statusAC = (value: StatusType) => ({type: ACTIONS_TYPE.CHANGE_STATUS, value} as const)
// thunks

export const initializeAppTC = () => (dispatch: Dispatch) => {
    API.authMe()
        .then(res => {
            dispatch(isInitializedAC(true))
    })
}
// types
export type ChangeStatusType = ReturnType<typeof change_statusAC>
type ActionsType =
    | ReturnType<typeof isInitializedAC>
    | ChangeStatusType
