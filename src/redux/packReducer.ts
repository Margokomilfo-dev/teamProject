import CARDAPI, {AddPackType, CardPackType, GetCardPacksResponseType, UpdatePackType} from "../api/cardApi";
import {Dispatch} from "redux";
import API from "../api/api";
import {isInitializedAC} from "./appReducer";


export enum ACTIONS_TYPE {
    GET_CARD_PACKS = 'packsReducer/GET_CARD_PACKS',
    REMOVE_CARD_PACKS = 'packsReducer/REMOVE_CARD_PACKS',
}

const initialState: GetCardPacksResponseType = {
    cardPacks: [
        // {
        //     _id: '1',
        //     user_id: '5eecf82a3ed8f700042f1186',
        //     name: 'halohalo',
        //     cardsCount: 10,
        //     created: 'jckj',
        //     updated: 'bdfj'
        // },
        // {
        //     _id: '2',
        //     user_id: '5eecf82a3ed8f700042f1186',
        //     name: 'halohalo',
        //     cardsCount: 10,
        //     created: 'jckj',
        //     updated: 'bdfj'
        // },

    ] as Array<CardPackType>,
    cardPacksTotalCount: 0,
    maxCardsCount: 1000,
    minCardsCount: 0,
    page: 1,
    pageCount: 10,
}


export const packsReducer = (state: GetCardPacksResponseType = initialState, action: ActionsType): GetCardPacksResponseType => {
    switch (action.type) {
        case ACTIONS_TYPE.GET_CARD_PACKS:
            return {
                ...state,
                cardPacks: action.cards
            }
        case ACTIONS_TYPE.REMOVE_CARD_PACKS:
            const newState = {...state, cardPacks: state.cardPacks.filter(cardPack => cardPack._id !== action.id)}
            return newState
        default:
            return state
    }
}

// actions
export const getCardPacksAC = (cards: GetCardPacksResponseType) => ({type: ACTIONS_TYPE.GET_CARD_PACKS, cards} as const)
export const deletePackAC = (id: string) => ({type: ACTIONS_TYPE.REMOVE_CARD_PACKS, id} as const)

//thunks

export const getCardPacksTC =
    (packName: string = '1',
     min: number = 3, max: number = 9,
     sortPacks: string = '0updates', page: number = 1, pageCount: number = 4, user_id: string = '5eecf82a3ed8f700042f1186') => (dispatch: Dispatch<ActionsType>) => {

    debugger
        // API.authMe().then(res => {
        //     dispatch(isInitializedAC(true))
            CARDAPI.getCardPacks(packName, min, max, sortPacks, page, pageCount, user_id)
                .then(res => {
                    debugger
                    dispatch(getCardPacksAC(res.data))
                })
                .catch(error => {
                        console.log(error)
                    }
                )
        // })

    }


export const removeCardPacksTC = (id: string) => (dispatch: Dispatch<ActionsType>) => {
    CARDAPI.deletePack(id)
        .then(res => {
            dispatch(deletePackAC(id))
        })
        .catch((error) => {
            console.log(error)
        })
}

export const addCardPacksTC = (data: AddPackType) => (dispatch: Dispatch<ActionsType>) => {
    CARDAPI.addPack(data)
        .then(res => {
            dispatch(getCardPacksTC())
        })
        .catch((error) => {
            console.log(error)
        })
}

export const updateCardPacksTC = (data: UpdatePackType) => (dispatch: Dispatch<ActionsType>) => {
    CARDAPI.updatePack(data)
        .then(res => {
            dispatch(getCardPacksTC())
        })
        .catch((error) => {
            console.log(error)
        })
}

//types
export type ActionsType = ReturnType<typeof getCardPacksAC> | ReturnType<typeof deletePackAC | ReturnType<any>>
