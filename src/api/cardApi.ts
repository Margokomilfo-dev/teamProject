import axios from 'axios'
import API, {PassRecResponseType, RegistrationPostResponseType} from "./api";

const instance = axios.create({
    // baseURL: 'https://neko-back.herokuapp.com/2.0/', //heroku
    baseURL: 'http://localhost:7542/2.0/',  //local
    withCredentials: true,
    headers: {}
})

export const CARDAPI = {
    getCardPacks: (packName: string = '', min: number = 3, max: number = 9, sortPacks: string = '0updates', page: number = 1, pageCount: number = 4, user_id: string = '5eecf82a3ed8f700042f1186') =>{
        return instance.get<GetCardPacksResponseType>
        (`/cards/pack?packName=${packName}&min=${min}&max=${max}&sortPacks=${sortPacks}&page=${page}&pageCount=${pageCount}&user_id=${user_id}`).then(res => {
            debugger
            return res
        })
    },
    addPack: (data: AddPackType) => {
        return instance.post('/cards/pack', {cardsPack: data})
    },
    deletePack: (id: string) => {
    return instance.delete(`/cards/pack/?id=${id}`)
    },
    updatePack: (data: UpdatePackType) => {
        return instance.put('/cards/pack', {cardsPack: data})
    },
}

export default CARDAPI

//types
export type GetCardPacksResponseType = {
    cardPacks: Array<CardPackType>
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
}

export type CardPackType = {
    _id: string
    user_id: string
    name: string
    cardsCount: number
    created: string
    updated: string
}

export type AddPackType = {
    name?: string
    deckCover?: string
    private?: boolean
}

export type UpdatePackType = {
    _id: string
    name?: string
}

