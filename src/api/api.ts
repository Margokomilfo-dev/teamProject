import axios from 'axios';


const instance = axios.create({
    // baseURL: 'https://neko-back.herokuapp.com/2.0', //heroku
    baseURL: 'http://localhost:7542/2.0/',  //local
    withCredentials: true,
    headers: {
        'API-KEY': 'bb865843-5d18-4250-b5ca-e680c11343f1', //Margo
        //НАПИШИТЕ ЗДЕСЬ СВОЙ и пользуйтесь именно своим ключиком! =)
        // 'API-KEY':     //Alex
        // 'API-KEY2':     'bb865843-5d18-4250-b5ca-e680c11343f1'
    }
})

export const API = {
    registration: (email: string, password: string) => {
        return instance.post<RegistrationPostResponseType>('/auth/register',{email, password}).then(response => {
            return response.data
        })
    },
    authMe: () => {

    },
    login: ( email: string, password: string, rememberMe: boolean = true) => {
        return instance.post<LoginResponseType>('auth/login' , {email, password,rememberMe}).then(response => {
            return response.data
        })
    },
    logOut: () => {
        return instance.delete<LogOutResponseType>(`auth/login`);
    },
};

export default API;


//types
export type LogOutResponseType = {
    info: string
    error: string
}

export type LoginResponseType  = {
    _id: string
    email: string
    name: string
    avatar?: string
    publicCardPacksCount: number;
    created: Date
    updated: Date
    isAdmin: boolean
    verified: boolean
    rememberMe: boolean
    error?: string
}

export type AuthLoginType = {
    email: string
    password: string
    rememberMe: true
}

export type RegistrationPostDataType = { email: string, password: string }
export type RegistrationPostResponseType = {addedUser: any, error?: string}
