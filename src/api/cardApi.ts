import axios from 'axios'
import { CardPackType } from '../redux/packReducer';

const instance = axios.create({
    // baseURL: 'https://neko-back.herokuapp.com/2.0/', //heroku
    baseURL: 'http://localhost:7542/2.0/',  //local
    withCredentials: true,
    headers: {}
})

 const CARDAPI = {
    getCardPacks:() =>{
        return instance.get<GetCardPacksResponseType>(`/cards/pack`).then(res =>  res.data.cardPacks)
    },
 }

//types
export type GetCardPacksResponseType = {
    cardPacks: Array<CardPackType>
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
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

