import axios from 'axios';


const instance = axios.create({
    // baseURL: 'https://neko-back.herokuapp.com/2.0', //heroku
    baseURL: 'http://localhost:7542/2.0/',  //local
    withCredentials: true,
    headers: {
        'API-KEY': '4ecc4fdb-da6b-45f9-bb99-93bccea55cd4', //Margo
        //НАПИШИТЕ ЗДЕСЬ СВОЙ и пользуйтесь именно своим ключиком! =)
        // 'API-KEY':     //Alex
        'API-KEY2':     'bb865843-5d18-4250-b5ca-e680c11343f1'
    }
})

export const API = {
    registration: (data: RegistrationPostDataType) => {
        return instance.post<RegistrationPostResponseType>('/auth/register', {data}).then(response => {
            return response.data
        })
    },
    authMe: () => {

    },
    login: (data: AuthLoginType) => {
        return instance.post<LoginResponseType>('auth/login' , {data}).then(response => {
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
