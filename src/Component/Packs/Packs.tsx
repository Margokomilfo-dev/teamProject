import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../redux/store";
import {CardPackType, GetCardPacksResponseType, UpdatePackType} from "../../api/cardApi";
import {addCardPacksTC, getCardPacksTC, removeCardPacksTC, updateCardPacksTC} from "../../redux/packReducer";

import {Redirect} from "react-router-dom";
import {CircularProgress} from "@material-ui/core";
import s from './Packs.module.css'

export const Packs = () => {
    const dispatch = useDispatch()
    const cardPacks = useSelector<AppRootStateType,  Array<CardPackType>>(state => state.pack.cardPacks)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
    // const [isLoaded, setIsLoaded] = useState(true)

    useEffect(() => {
        // setIsLoaded(true)
        dispatch(getCardPacksTC())

    }, [])

    // if (!isLoaded) {
    //     return <div className={s.loader}><CircularProgress/></div>
    // }

    const removeCardPacks = (id: string) => {
        dispatch(removeCardPacksTC(id))
    }

    const updateCardPacks = (data: UpdatePackType) => {
        dispatch(updateCardPacksTC(data))
    }

    const addCardPacks = () => {
        dispatch(addCardPacksTC({name: 'new'}))
    }

    if(isLoggedIn) {
        return <Redirect to={'/profile'}/>
    }

    return (
        <div>
            <div className={s.header}>
                <p>Name</p>
                <p>cardsCount</p>
                <p>updated</p>
                <p>Name</p>
                <button onClick={addCardPacks}>Add</button>
            </div>
            {cardPacks.map((cardpack, id) => <div key={id} className={s.packs}>
                <p>{cardpack.name}</p>
                <p>{cardpack.cardsCount}</p>
                <p>{cardpack.updated}</p>
                <p>{cardpack}</p>
                <div className={s.buttonsWrapper}>
                    <button onClick={()=>removeCardPacks(cardpack._id)}></button>
                    {/*<button onClick={() => updateCardPacks(cardpack.data)}></button>*/}
                </div>
            </div>)}

        </div>
    )
}

