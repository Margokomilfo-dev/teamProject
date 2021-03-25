import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {appReducer} from './appReducer'
import { authReducer } from './authReducer'
import {loginReducer} from "./loginReducer";
import {forgotReducer} from "./forgotReducer";
import { profileReducer } from './profileReducer';
import {packsReducer} from "./packReducer";
import {cardsReducer} from './cardsReducer'


const rootReducer = combineReducers({
    auth: authReducer,
    app: appReducer,
    login: loginReducer,
    profile: profileReducer,
    passRec: forgotReducer,
    pack: packsReducer,
    cards: cardsReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))


export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;
