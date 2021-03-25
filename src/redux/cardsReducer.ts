import {Dispatch} from 'redux'
import {API, APIpack} from '../api/api'
import {log} from 'util'

export enum ACTIONS_TYPE {
    SET_CARDS = 'cardsReducer/SET_CARDS',
    SET_PACK_ID = 'cardsReducer/SET_PACK_ID',
}

const initialState = {
    cards: [] as Array<CardType | null>,
    packId: '',
}
type InitialStateType = typeof initialState

export const cardsReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case ACTIONS_TYPE.SET_CARDS:
            return {...state, cards: action.cards}
        case ACTIONS_TYPE.SET_PACK_ID:
            debugger
            return {...state, packId: action.id}
        default:
            return state
    }
}
export const setCards = (cards: Array<CardType>) => ({type: ACTIONS_TYPE.SET_CARDS, cards} as const)
export const setPackId = (id: string) => ({type: ACTIONS_TYPE.SET_PACK_ID, id} as const)
// thunks

export const getCardsTC = (packId: string) => (dispatch: Dispatch) => {
    debugger
    APIpack.getCards(packId).then(res => {
        dispatch(setCards(res.cards))
    })
        .catch(err => console.log(JSON.stringify(err)))
}
// types
type ActionsType =
    | ReturnType<typeof setCards>
    | ReturnType<typeof setPackId>


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