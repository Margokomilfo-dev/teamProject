import axios from 'axios';

const instance = axios.create({
    // baseURL: 'https://neko-back.herokuapp.com/2.0', //heroku
    baseURL: 'http://localhost:7542/2.0/',  //local
    withCredentials: true,
    headers: {
        'API-KEY': '4ecc4fdb-da6b-45f9-bb99-93bccea55cd4' //Margo
        //НАПИШИТЕ ЗДЕСЬ СВОЙ и пользуйтесь именно своим ключиком! =)
        // 'API-KEY':     //Alex
        // 'API-KEY':     //Natali
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
    login: () => {

    },
    logOut: () => {

    },
};


export default API;


//types
export type RegistrationPostDataType = { email: string, password: string }
export type RegistrationPostResponseType = {addedUser: any, error?: string}