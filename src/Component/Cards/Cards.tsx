import React, {FC} from 'react'
import {CardType} from '../../redux/cardsReducer'
import {useSelector} from 'react-redux'
import {AppRootStateType} from '../../redux/store'
import s from './Cards.module.css'

type PropsType = {
    // userId: string
    // packId: string
    // setCards: (value: boolean)=> void
}

export const Cards:FC<PropsType>= (props) => {


    const cards = useSelector<AppRootStateType, Array<CardType | null>>(state =>  state.cards.cards )
    console.log(cards)
    return (
        <div className={s.cards}>
            {/*<p>packId= {packId}</p>*/}
            {/*<p>userId= {userId}</p>*/}
            {cards.map((c, i) => c ? <div key={i}> {c.answer}</div> : <div>bla</div>)}

        </div>
    )
}