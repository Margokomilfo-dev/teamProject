import {Dispatch} from "redux";
import {CARDAPI} from "../api/api";


export enum ACTIONS_TYPE {
    SET_CARD_PACKS = 'packsReducer/SET_CARD_PACKS'
}

const initialState = {
    cardPacks: [] as Array<CardPackType>,
    cardPacksTotalCount: 0,
    maxCardsCount: 1000,
    minCardsCount: 0,
    page: 1,
    pageCount: 10,
}
type InitialStateType = typeof initialState


export const packsReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case ACTIONS_TYPE.SET_CARD_PACKS:
            return {
                ...state,
                cardPacks: [...state.cardPacks, ...action.cards]
            }
        default:
            return state
    }
}

// actions
export const setCardPacksAC = (cards: Array<CardPackType>) => ({type: ACTIONS_TYPE.SET_CARD_PACKS, cards} as const)

//thunks
export const getCardPacksTC = () => (dispatch: Dispatch) => {
    CARDAPI.getCardPacks().then(res => {
        dispatch(setCardPacksAC(res))
    })

}


//types
export type ActionsType = ReturnType<typeof setCardPacksAC>
export type CardPackType = {
    "_id": string
    "user_id": string
    "user_name": string
    "private": boolean
    "name": string
    "path": string
    "grade": number
    "shots": number
    "cardsCount": number
    "type": string
    "rating": number
    "created": string
    "updated": string
    "more_id": string
    "__v": number
    "deckCover": null | any
}
