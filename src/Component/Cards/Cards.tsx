import React, {FC, useState} from 'react'
import {CardType} from '../../redux/cardsReducer'
import {useSelector} from 'react-redux'
import {AppRootStateType} from '../../redux/store'
import s from './Cards.module.css'
import {Button} from 'antd'
import {DeleteTwoTone, EditTwoTone, FolderAddOutlined} from '@ant-design/icons'
import {Redirect} from 'react-router-dom'

type PropsType = {
    // userId: string
    // packId: string
    // setCards: (value: boolean)=> void
}

export const Cards:FC<PropsType>= (props) => {
    const [packs, setPacks] = useState(false)
    const cards = useSelector<AppRootStateType, Array<CardType | null>>(state =>  state.cards.cards )
    const id = useSelector<AppRootStateType, string>(state =>  state.profile.profile ? state.profile.profile?._id : '')
    const packUserId = useSelector<AppRootStateType, string>(state =>  state.cards.packUserId)
    console.log(id)
    console.log(packUserId)

    const deleteOfCard = (id: string) => {

    }
    const updateOfCard = (id: string) => {

    }
    if (packs) {
        return <Redirect to={'/packs'}/>
    }
    return (
        <div className={s.cards}>
            <div className={s.header}>
                <div className={s.mainInfo}>
                    <p>question</p>
                    <p className={s.answer}>answer {id !== packUserId && <span>not your</span>}</p>
                </div>
                    <Button type='default' style={{marginRight: '5px'}} onClick={()=>setPacks(true)}>Packs</Button>
                    <Button type='default' style={{marginRight: '5px'}} onClick={()=> {}} disabled={id !== packUserId}>Add card</Button>


            </div>
            {cards.map((c, i) => c && <div key={i} className={s.packCards}>
                <div className={s.mainInfo}>
                    <p>{c.question}</p>
                    <p>{c.answer}</p>
                </div>
                <div>
                    <Button type='default'
                                                 style={{marginRight: '5px'}}
                                                 shape={'circle'}
                                                 onClick={() => updateOfCard(c._id)}
                                                 icon={<EditTwoTone/>} disabled={id !== c.user_id}/>
                    <Button type="default"
                                                 onClick={() => deleteOfCard(c._id)}
                                                 style={{marginRight: '5px'}}
                                                 shape={'circle'}
                                                 icon={<DeleteTwoTone/>}
                                                 disabled={id !== c.user_id}/>
                </div>

            </div> )}
        </div>
    )
}