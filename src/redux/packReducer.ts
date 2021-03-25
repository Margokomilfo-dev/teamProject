import {Dispatch} from "redux";
import {APIpack} from "../api/api";
import {change_statusAC} from './appReducer'


export enum ACTIONS_TYPE {
    SET_CARD_PACKS = 'packsReducer/SET_CARD_PACKS',
    SET_PAGE_COUNT = 'packsReducer/SET_PAGE_COUNT',
    SET_PACKS_TOTAL_COUNT = 'packsReducer/SET_PACKS_TOTAL_COUNT',
    ADD_NEW_PACKS_CARD = 'packReducer/ADD_NEW_PACKS_CARD',
    DELETE_PACK_CARD = 'packReducer/DELETE_PACK_CARD',
    UPDATE_PACK_CARD = 'packReducer/UPDATE_PACK_CARD'
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
                cardPacks: action.packs.map(pack => ({...pack}))
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
        case ACTIONS_TYPE.ADD_NEW_PACKS_CARD:
            return {...state,
                cardPacks: [ action.card, ...state.cardPacks]}
        case ACTIONS_TYPE.DELETE_PACK_CARD:
            return {...state,
                cardPacks: [...state.cardPacks.filter(pack => pack._id !== action.idCard)]}
        case ACTIONS_TYPE.UPDATE_PACK_CARD:
            return {...state}
        default:
            return state
    }
}

// actions
export const setCardPacksAC = (packs: Array<CardPackType>) => ({
    type: ACTIONS_TYPE.SET_CARD_PACKS, packs } as const)

export const setCardPacksPageCountAC = (value: number) => ({type: ACTIONS_TYPE.SET_PAGE_COUNT, value} as const)

export const setCardPacksTotalCountAC = (value: number) => ({type: ACTIONS_TYPE.SET_PACKS_TOTAL_COUNT, value} as const)
//add packs
export const addNewCardsPackAC = (card: CardPackType) => ({ type: ACTIONS_TYPE.ADD_NEW_PACKS_CARD, card} as  const)
//delete pack
export const deleteCardPackAC = (idCard: string) => ({type: ACTIONS_TYPE.DELETE_PACK_CARD, idCard} as const)
//update pack
export const updateCardPackAC = (idCard: string, newName: string) => ({type: ACTIONS_TYPE.UPDATE_PACK_CARD,
    idCard, newName} as const)

//thunks get all cards
export const getCardPacksTC = (pageNumber?: number, pageCount?: number, userID?: string) => (dispatch: Dispatch) => {
    dispatch(change_statusAC('loading'))
    APIpack.getCardPacks(pageNumber).then(res => {
        dispatch(setCardPacksAC(res.cardPacks))
        dispatch(setCardPacksPageCountAC(res.pageCount))
        dispatch(setCardPacksTotalCountAC(res.cardPacksTotalCount))
        dispatch(change_statusAC('success'))
    })
}
//thunk add new PacksCards
export const addNewCardPackTC = () => (dispatch: Dispatch) => {
    dispatch(change_statusAC('loading'))
    APIpack.addPack()
      .then(res => {
          dispatch(change_statusAC('loading'))
          dispatch(addNewCardsPackAC(res.newCardsPack))
          // getCardPacksTC()
          dispatch(change_statusAC('success'))
      })
}
//thunk for delete Pack
export const deleteCardPackTC = (idPack: string) => (dispatch: Dispatch) => {
    APIpack.deletePack(idPack)
      .then(res => {
          dispatch(change_statusAC('loading'))
          dispatch( deleteCardPackAC(idPack))
          // getCardPacksTC()
          dispatch(change_statusAC('success'))
      })
}
//thunk for update Pack
export const updateCardPackTC = (idPack: string, newName: string) => (dispatch: Dispatch) => {
    APIpack.updatePack(idPack)
      .then(res => {
          dispatch(change_statusAC('loading'))
          dispatch(updateCardPackAC( idPack, newName))
          dispatch(change_statusAC('success'))
      })
}


//types
export type ActionsType =
    | ReturnType<typeof setCardPacksAC>
    | ReturnType<typeof setCardPacksPageCountAC>
    | ReturnType<typeof setCardPacksTotalCountAC>
    | ReturnType<typeof addNewCardsPackAC>
    | ReturnType<typeof deleteCardPackAC>
    | ReturnType<typeof updateCardPackAC>

export type CardPackType = {
    _id: string
    user_id: string
    user_name: string
    private: boolean
    name: string
    path: string
    grade: number
    shots: number
    cardsCount: number
    type: string
    rating: number
    created: string
    updated: string
    more_id: string
    __v: number
    deckCover: null | any
}
