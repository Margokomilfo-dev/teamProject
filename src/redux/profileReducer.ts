import API, {AuthLoginType} from '../api/api'
import {Dispatch} from 'redux'
import { ProfileType } from './loginReducer'

export enum ACTIONS_TYPE {
    SET_PROFILE = 'loginReducer/SET_PROFILE',
}

const initialState = {
    profile: null as null | ProfileType
}
type InitialStateType = typeof initialState

export const profileReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case ACTIONS_TYPE.SET_PROFILE:
            return {...state, profile: action.profile}
        default:
            return state
    }
}

// actions

export const setProfileAC = (profile: ProfileType) => ({type: ACTIONS_TYPE.SET_PROFILE, profile} as const)

//thunks


//types
type ActionsType = ReturnType<typeof setProfileAC>
