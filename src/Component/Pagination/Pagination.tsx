import React, {FC} from 'react'
import s from './Pagination.module.css'
import {Pagination} from 'antd'


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
            <Pagination showQuickJumper defaultCurrent={1} total={props.totalItemCount} onChange={onChange}/>
        </div>
    )
}