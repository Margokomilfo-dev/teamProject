import React, {FC, useState} from 'react'
import {CardType} from '../../redux/cardsReducer'
import {useSelector} from 'react-redux'
import {AppRootStateType} from '../../redux/store'
import s from './Cards.module.css'
import {Button} from 'antd'
import {Redirect} from 'react-router-dom'
import {RollbackOutlined, DeleteTwoTone, EditTwoTone, FolderAddOutlined} from '@ant-design/icons'
import {Loading} from '../Loading/loading'

type PropsType = {
    // userId: string
    // packId: string
    // setCards: (value: boolean)=> void
}

export const Cards: FC<PropsType> = (props) => {
    const [packs, setPacks] = useState(false)
    const [addCard, setAddCard] = useState(false)
    const cards = useSelector<AppRootStateType, Array<CardType | null>>(state => state.cards.cards)
    const id = useSelector<AppRootStateType, string>(state => state.profile.profile ? state.profile.profile?._id : '')
    const packUserId = useSelector<AppRootStateType, string>(state => state.cards.packUserId)
    const status = useSelector<AppRootStateType, string>(state => state.app.status)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)

    const deleteOfCard = (id: string) => {

    }
    const updateOfCard = (id: string) => {

    }
    const openPopup = () => {
        setAddCard(true)
    }

    const addNewCard = () => {
        setAddCard(false)
    }
    if (status==='loading'){
        return <Loading/>
    }
    if (packs) {
        return <Redirect to={'/packs'}/>
    }
    if (!isLoggedIn) {
        return <Redirect to={'/login'}/>
    }
    return (
        <div className={s.cards}>


            {addCard && <div className={s.popup}>
                <div className={s.addCard}>
                    question: <input type="text"/>
                    answer: <input type="text"/>
                    <button onClick={addNewCard}>close</button>
                </div>
            </div>}




            <div className={s.header}>
                <div className={s.mainInfo}>
                    <p>question</p>
                    <p className={s.answer}>answer {id !== packUserId && <span>not your</span>}</p>
                </div>
                <Button type='default' style={{marginRight: '5px'}} onClick={() => setPacks(true)}
                        icon={<RollbackOutlined/>}
                        shape={'circle'}/>
                <Button type='default'
                        style={{marginRight: '5px'}}
                        shape={'circle'}
                        icon={<FolderAddOutlined/>}
                        onClick={openPopup}
                        disabled={id !== packUserId}/>

            </div>
            {cards.length ? cards.map((c, i) => c && <div key={i} className={s.packCards}>
                <div className={s.mainInfo}>
                    <p>{c.question}</p>
                    <p>{c.answer}</p>
                </div>
                <div>
                    {id === c.user_id && <Button type='default'
                                                 style={{marginRight: '5px'}}
                                                 shape={'circle'}
                                                 onClick={() => updateOfCard(c._id)}
                                                 icon={<EditTwoTone/>} disabled={id !== c.user_id}/>}
                    {id === c.user_id && <Button type="default"
                                                 onClick={() => deleteOfCard(c._id)}
                                                 style={{marginRight: '5px'}}
                                                 shape={'circle'}
                                                 icon={<DeleteTwoTone/>}
                                                 disabled={id !== c.user_id}/>}
                </div>

            </div>)
            : <div className={s.noCards}>no cards</div>}
        </div>
    )
}