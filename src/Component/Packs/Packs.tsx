import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../redux/store";
import s from './Packs.module.css'
import {addNewCardPackTC, CardPackType, deleteCardPackTC, getCardPacksTC, updateCardPackTC} from "../../redux/packReducer";
import {Button} from "antd";
import {PaginationComp} from '../Pagination/Pagination'
import {Redirect} from 'react-router-dom'
import { DeleteTwoTone, EditTwoTone, FolderOpenOutlined, FolderAddOutlined } from '@ant-design/icons'

export const Packs = () => {
    const dispatch = useDispatch()
    const cardPacksTotalCount = useSelector<AppRootStateType, number >(state => state.pack.cardPacksTotalCount)
    const cardPacks = useSelector<AppRootStateType,  Array<CardPackType>>(state => state.pack.cardPacks)
    const isLogin = useSelector<AppRootStateType,  boolean>(state => state.auth.isLogin)
    const idUser = useSelector<AppRootStateType,  string>(state => state.profile.profile ? state.profile.profile?._id : '')

    const onChangePage = (pageNumber: number) => {
        dispatch(getCardPacksTC(pageNumber))
    }

    useEffect(() => {
        dispatch(getCardPacksTC())
    }, [])

    const addNewPacks = () => {
        dispatch(addNewCardPackTC())
    }
    const deleteOfPack = (idPack: string) => {
        dispatch(deleteCardPackTC(idPack))
    }
    const updateOfPack = (idPack: string, newName: string = 'best of the best') => {
        dispatch(updateCardPackTC(idPack, newName))
    }

    if (!isLogin) {
        return <Redirect to={'/login'}/>
    }

    return (
        <div className={s.container}>
            <div className={s.header}>
                <p>Name</p>
                <p style={{marginRight: "120px"}}>cardsCount</p>
                <p>updated</p>
                <Button type='default' style={{marginRight: '5px'}}>myPacks</Button>
                <Button type ='default'
                        style={{marginRight: '5px'}}
                        shape={'circle'}
                        icon = {<FolderAddOutlined />}
                        onClick = {addNewPacks} />
            </div>
            {cardPacks.map((k, i) => <ul key={i} className={s.cardPacksWrapper}>
                <li className={s.card}>{k.name}</li>
                <li className={s.card}>{k.cardsCount}</li>
                <li className={s.card}>{k.updated}</li>
                <Button type='default'
                        style={{marginRight: '5px'}}
                        shape={'circle'}
                        icon={<FolderOpenOutlined />}/>
                { idUser === k.user_id && <Button type='default'
                                             style={{marginRight: "5px"}}
                                             shape={'circle'}
                                             onClick={() => updateOfPack(k._id)}
                                             icon={<EditTwoTone />}/>}
                { idUser === k.user_id && <Button type="default"
                                             onClick={()=> deleteOfPack(k._id)}
                                             style={{marginRight: "5px"}}
                                             shape={'circle'}
                                             icon={<DeleteTwoTone/>}/>}
            </ul>)}
            <PaginationComp totalItemCount={cardPacksTotalCount} onChangePage={onChangePage}/>
        </div>
    )
}
