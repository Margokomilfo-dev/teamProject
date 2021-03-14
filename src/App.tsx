import React from 'react'
import './App.css'
import {HashRouter, Redirect} from 'react-router-dom'
import Routes from './Component/Routes/Routes'
import Header from './Component/Header/Header'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from './redux/store'

function App() {
    // const isInitialized = useSelector<AppRootStateType>(state => state.app.isInitialized)
    // if (!isInitialized) {
    //     return <Redirect to={'login'}/>
    // }

    return (
        <>
            <Header/>
            <Routes/>
        </>
    )
}

export default App
