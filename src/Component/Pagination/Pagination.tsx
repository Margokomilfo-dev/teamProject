import React, {FC} from 'react'
import s from './Pagination.module.css'
import {Pagination} from 'antd'
import {useSelector} from 'react-redux'
import {AppRootStateType} from '../../redux/store'


type PropsType = {
    totalItemCount: number
    onChangePage: (pageNumber: number) => void
}
export const PaginationComp: FC<PropsType> = (props) => {

    const onChange = (pageNumber: number) => {
        props.onChangePage(pageNumber)
    }
    return (
        <div className={s.pagination}>
            <Pagination showQuickJumper defaultCurrent={2} total={props.totalItemCount} onChange={onChange}/>
        </div>
    )
}