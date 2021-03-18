
export enum ACTIONS_TYPE {
    SET_PROFILE = 'loginReducer/SET_PROFILE',
}
export type ProfileType = {
    avatar: string
    created: string
    email: string
    isAdmin: boolean
    name: string
    publicCardPacksCount: number
    rememberMe: boolean
    token: string
    tokenDeathTime: number
    updated: string
    verified: boolean
    __v: number
    _id: string
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
