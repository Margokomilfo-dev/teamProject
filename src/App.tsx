import React from 'react';
import './App.css';
import {HashRouter} from "react-router-dom";
import Routes from "./Component/Routes/Routes";
import Header from "./Component/Header/Header";

function App() {
  return (
    <HashRouter>
      <Header/>
      <Routes/>
    </HashRouter>
  )
}

export default App;
