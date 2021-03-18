import {Dispatch} from 'redux'
import {CARDAPI} from '../api/api'


export enum ACTIONS_TYPE {
    SET_CARD_PACKS = 'packsReducer/SET_CARD_PACKS',
    SET_PAGE_COUNT = 'packsReducer/SET_PAGE_COUNT',
    SET_PACKS_TOTAL_COUNT = 'packsReducer/SET_PACKS_TOTAL_COUNT',
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
                cardPacks: [...action.cards]
            }
        case ACTIONS_TYPE.SET_PAGE_COUNT:
            return {
                ...state,
                pageCount: action.value
            }
        case ACTIONS_TYPE.SET_PACKS_TOTAL_COUNT:
                return {
                    ...state,
                    cardPacksTotalCount: action.value
                }
        default:
            return state
    }
}

// actions
export const setCardPacksAC = (cards: Array<CardPackType>) => ({type: ACTIONS_TYPE.SET_CARD_PACKS, cards} as const)
export const setCardPacksPageCountAC = (value: number) => ({type: ACTIONS_TYPE.SET_PAGE_COUNT, value} as const)
export const setCardPacksTotalCountAC = (value: number) => ({type: ACTIONS_TYPE.SET_PACKS_TOTAL_COUNT, value} as const)

//thunks
export const getCardPacksTC = (pageNumber?: number) => (dispatch: Dispatch) => {
    CARDAPI.getCardPacks(pageNumber).then(res => {
        dispatch(setCardPacksAC(res.cardPacks))
        dispatch(setCardPacksPageCountAC(res.pageCount))
        dispatch(setCardPacksTotalCountAC(res.cardPacksTotalCount))
    })

}


//types
export type ActionsType =
    | ReturnType<typeof setCardPacksAC>
    | ReturnType<typeof setCardPacksPageCountAC>
    | ReturnType<typeof setCardPacksTotalCountAC>

export type CardPackType = {
    '_id': string
    'user_id': string
    'user_name': string
    'private': boolean
    'name': string
    'path': string
    'grade': number
    'shots': number
    'cardsCount': number
    'type': string
    'rating': number
    'created': string
    'updated': string
    'more_id': string
    '__v': number
    'deckCover': null | any
}
