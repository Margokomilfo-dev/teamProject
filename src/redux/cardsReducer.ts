import {Dispatch} from 'redux'
import {API, APIpack} from '../api/api'
import {log} from 'util'

export enum ACTIONS_TYPE {
    SET_CARDS = 'cardsReducer/SET_CARDS',
    SET_PACK_ID = 'cardsReducer/SET_PACK_ID',
    SET_PACK_USER_ID = 'cardsReducer/SET_PACK_USER_ID',
}

const initialState = {
    cards: [] as Array<CardType | null>,
    packId: '',
    packUserId: '',
}
type InitialStateType = typeof initialState

export const cardsReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case ACTIONS_TYPE.SET_CARDS:
            return {...state, cards: action.cards}
        case ACTIONS_TYPE.SET_PACK_ID:
            return {...state, packId: action.id}
        case ACTIONS_TYPE.SET_PACK_USER_ID:
            return {...state, packUserId: action.id}
        default:
            return state
    }
}
export const setCards = (cards: Array<CardType>) => ({type: ACTIONS_TYPE.SET_CARDS, cards} as const)
export const setPackId = (id: string) => ({type: ACTIONS_TYPE.SET_PACK_ID, id} as const)
export const setPackUserId = (id: string) => ({type: ACTIONS_TYPE.SET_PACK_USER_ID, id} as const)
// thunks

export const getCardsTC = (packId: string) => (dispatch: Dispatch) => {
    APIpack.getCards(packId).then(res => {
        dispatch(setCards(res.data.cards))
        dispatch(setPackUserId(res.data.packUserId))
    })
        .catch(err => console.log(JSON.stringify(err)))
}
// types
type ActionsType =
    | ReturnType<typeof setCards>
    | ReturnType<typeof setPackId>
    | ReturnType<typeof setPackUserId>


export type CardType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    rating: number
    shots: number
    type: string
    user_id: string
    created: string
    updated: string
    __v: number
    _id: string
}