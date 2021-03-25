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
        return instance.get('auth/me').then(res => {
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
    newPass: (password: string, resetPasswordToken: string) => {
        return instance.post<NewPassResponseType> ('auth/set-new-password', {password, resetPasswordToken})
          .then(response => { return response.data })
    }

}

//API for PACS
export const APIpack = {
    getCardPacks:( pageNumber: number = 1, name: string = '', ) => {
        return instance.get<GetCardPacksResponseType>(`cards/pack?packName${name}&page=${pageNumber}&pageCount=10 `)
            .then(res => res.data)
    },
    addPack: () => {
        return instance.post<any>(`cards/pack`, {
            cardsPack: {
                name: 'new pack from the swords team',
                deckCover: '',
                private: false
            }
        })
            .then(res => res.data)
    },
    deletePack: (id: string) => {
        return instance.delete<any>(`cards/pack?id=${id}`)
            .then(res => res.data)
    },
    updatePack: (idPack: string) => {
        return instance.put<any>(`cards/pack`, {
            cardsPack: {
                _id: idPack,
                name: 'new name',
                deckCover: ""
            }
        })
            .then(res => res.data)
    },

    getCards: (packId: string) => {
        return instance.get(`cards/card?cardsPack_id=${packId}`)
            .then(res => {
                return res
            })
    }
}
//API for CARDS



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
