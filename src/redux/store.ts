import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {appReducer} from './appReducer'
import { authReducer } from './authReducer'
import {loginReducer} from "./loginReducer";


const rootReducer = combineReducers({
    auth: authReducer,
    app: appReducer,
    login: loginReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))


export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;
