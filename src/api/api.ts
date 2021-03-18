import axios from 'axios'
import {CardPackType} from "../redux/packReducer";

const instance = axios.create({
    // baseURL: 'https://neko-back.herokuapp.com/2.0/', //heroku
    baseURL: 'http://localhost:7542/2.0/',  //local
    withCredentials: true,
    headers: {}
})

export const API = {
    registration: (email: string, password: string) => {
        return instance.post<RegistrationPostResponseType>('/auth/register', {email, password}).then(response => {
            return response.data
        })
    },
    authMe: () => {
        return instance.post('auth/me', {}).then(res => {
            return res.data
        })
    },
    login: (email: string | null, password: string | null, rememberMe: boolean = true) => {
        return instance.post<LoginResponseType>('auth/login', {email, password, rememberMe}).then(response => {
            return response.data
        })
    },
    logOut: () => {
        return instance.delete<LogOutResponseType>(`auth/me`)
    },
    //for passRecovery
    passRec: (email: string, from: string, message: string) => {
        return instance.post<PassRecResponseType>('auth/forgot', {email, from, message})
          .then(response => { return response.data })
    },
    newPass: (password: string, token: string) => {
        return instance.post<NewPassResponseType> ('auth/set-new-password', {password, token})
          .then(response => { return response.data })
    }

}
export const CARDAPI = {
    getCardPacks:( pageNumber: number = 1, name: string = '') =>{
        return instance.get<GetCardPacksResponseType>(`cards/pack?packName${name}&page=${pageNumber}`).then(res =>  res.data)
    },
}


//types
export type LogOutResponseType = {
    info: string
    error: string
}

export type LoginResponseType = {
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

export type AuthLoginType = {
    email: string
    password: string
    rememberMe: true
}

export type RegistrationPostDataType = { email: string, password: string }
export type RegistrationPostResponseType = { addedUser: any, error?: string }

//for PasswordRec
export type PassRecType = {
    email: string
    from: string
    message: string
}
export type PassRecResponseType = {
    answer: boolean
    html: boolean
    info: string
    success: boolean
}

//types for Cards
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

export type NewPassResponseType = {
    info: string
    error: string
}
