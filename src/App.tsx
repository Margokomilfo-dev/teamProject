import React from 'react'
import './App.css'
import {HashRouter, Redirect} from 'react-router-dom'
import Routes from './Component/Routes/Routes'
import Header from './Component/Header/Header'
import {useSelector} from 'react-redux'
import {AppRootStateType} from './redux/store'


function App() {

    return (
        <div>
            <Header/>
            <Routes/>
        </div>
    )
}

export default App
