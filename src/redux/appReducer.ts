
export enum ACTIONS_TYPE {
}

const initialState = {

}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        default:
            return state
    }
}


// thunks


// types
type ActionsType = any