import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../redux/store";
import s from './Packs.module.css'
import {CardPackType, getCardPacksTC} from "../../redux/packReducer";
import {Button} from "antd";
import {PaginationComp} from '../Pagination/Pagination'
import {Redirect} from 'react-router-dom'
import { DeleteTwoTone, EditTwoTone } from '@ant-design/icons'

export const Packs = () => {
    const dispatch = useDispatch()
    const cardPacksTotalCount = useSelector<AppRootStateType, number >(state => state.pack.cardPacksTotalCount)
    const cardPacks = useSelector<AppRootStateType,  Array<CardPackType>>(state => state.pack.cardPacks)
    const isLogin = useSelector<AppRootStateType,  boolean>(state => state.auth.isLogin)

    const onChangePage = (pageNumber: number) => {
        dispatch(getCardPacksTC(pageNumber))
    }

    useEffect(() => {
        dispatch(getCardPacksTC())
    }, [])

    if (!isLogin) {
        return <Redirect to={'/login'}/>
    }

    return (
        <div className={s.container}>
            <div className={s.header}>
                <p>Name</p>
                <p style={{marginRight: "120px"}}>cardsCount</p>
                <p>updated</p>
                <p>Add</p>
            </div>
            {cardPacks.map((k, i) => <ul key={i} className={s.cardPacksWrapper}>
                <li className={s.card}>{k.name}</li>
                <li className={s.card}>{k.cardsCount}</li>

                <li className={s.card}>{k.updated}</li>
                <li className={s.card}>userId-{k.user_id}</li>
                <li className={s.card}>packId-{k._id}</li>
                <div>
                    <Button type='default' style={{marginRight: "5px"}} shape={'circle'}  icon={<EditTwoTone />}/>
                    <Button type="default" style={{marginRight: "5px"}} shape={'circle'} icon={<DeleteTwoTone/>} />
                </div>

            </ul>)}

            <PaginationComp totalItemCount={cardPacksTotalCount} onChangePage={onChangePage}/>
        </div>
    )
}
